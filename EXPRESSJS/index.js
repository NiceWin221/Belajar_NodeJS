import express from "express";
import dummy from "./dummy.js";

const app = express();

app.get("/", (req, res) => {
  res.end("go to check the other route");
});

app.get("/home", (req, res) => {
  res.sendFile("./home.html");
});

app.get("/book", (req, res) => {
  const { id, price, filter } = req.query;

  if (id) {
    const data = dummy.filter((data) => data.id === parseInt(id));
    return res.json(data);
  }

  if (price & filter) {
    switch (filter) {
      case ">":
        return res.json(dummy.filter((data) => data.harga > price));
        break;

      case "<":
        return res.json(dummy.filter((data) => data.harga < price));
        break;

      default:
        return res.json(dummy);
        break;
    }
  }
});

app.listen(5173, () => {
  console.log("server running at port 3000");
});
