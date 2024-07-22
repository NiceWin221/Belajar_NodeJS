require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    username: "Sandhika",
    title: "Post1",
  },
  {
    username: "Bryan",
    title: "Post2",
  },
];

const akun = { username: "Sandhika", password: "sandhika123" };

const PORT = process.env.PORT | 3000;

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username == akun.username && password == akun.password) {
    const accessToken = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
    return res.json({ accessToken });
  } else {
    return res.json({ message: "Akun Salah" });
  }
});

app.get("/dashboard", (req, res) => {
  const headers = req.headers["authorization"];
  const token = headers.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ message: "unauthorized" }).status(401);

    return res.json({ data: posts });
  });
  return res.json({ message: "Failed to Get Token" });
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
