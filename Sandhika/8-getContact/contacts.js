const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirData = "./data";
if (!fs.existsSync(dirData)) {
  fs.mkdirSync(dirData);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, password) => {
  const mhs = { nama, email, password };
  const file = fs.readFileSync("data/contact.json", "utf-8");
  const json = JSON.parse(file);
  json.push(mhs);

  fs.writeFileSync("data/contact.json", JSON.stringify(json));
  console.log("Data telah dimasukkan");
  rl.close();
};

module.exports = { tulisPertanyaan, simpanContact };
