const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// konfigurasi ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// konfigurasi express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// halaman home
app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layouts",
    title: "Halamn Home",
  });
});

// halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

// halaman contact
app.get("/contact", (req, res) => {
  const mahasiswa = [
    {
      nama: "Sandhika",
      email: "sandhika@gmail.com",
    },
    {
      nama: "Bryan",
      email: "bryan@gmail.com",
    },
  ];
  res.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
    mahasiswa,
  });
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
