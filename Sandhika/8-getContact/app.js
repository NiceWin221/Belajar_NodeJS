const { tulisPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama kamu : ");
  const email = await tulisPertanyaan("Masukan email kamu : ");
  const password = await tulisPertanyaan("Masukan password kamu : ");

  simpanContact(nama, email, password);
};

main();
