const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  next();
};
const four = (req, res, next) => {
  console.log("four");
  next();
};
const five = (req, res, next) => {
  setTimeout(() => {
    console.log("five");
    next();
  }, 5000);
};

setTimeout(() => {});
const six = (req, res, next) => {
  console.log("six");
  res.send("FInished");
};

app.get("/chain", [one, two, three, four, five, six]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
