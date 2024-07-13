const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const app = express();
const port = 5173;

// konfigurasi flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// konfigurasi methodoverride
app.use(methodOverride("_method"));

// database mongodb
const Contact = require("./model/contact");
const { set } = require("mongoose");
require("./utils/db");

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// viewengine ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// halaman home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Sandhika Galih",
      email: "sandhika@gmail.com",
    },
    {
      nama: "Windy Saputra",
      email: "windy@gmail.com",
    },
    {
      nama: "Bryan Athallah",
      email: "bryan@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Halaman Home",
    nama: "Sandhika Galih",
    mahasiswa,
  });
});

// halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// halaman contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// proses routing tambah contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHP", "Nomor HP tidak valid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Halaman Tambah Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      await Contact.insertMany(req.body);
      // kirimkan flash message
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contacts = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
  });
});

// hapus data contact
app.delete("/contact", async (req, res) => {
  await Contact.deleteOne({ nama: req.body.nama });
  req.flash("msg", "Data contact berhasil dihapuskan!");
  res.redirect("/contact");
});

// halaman mengubah/mengedit data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Halaman Tambah Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses mengubah/mengedit data contact
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHP", "Nomor HP tidak valid").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Halaman Tambah Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      await Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHP: req.body.noHP,
          },
        }
      );
      // kirimkan flash message
      req.flash("msg", "Data contact berhasil diubah!");
      res.redirect("/contact");
    }
  }
);

app.listen(port, () => {
  console.log(`Monggo Contact App | listening at http://localhost:${port}`);
});
