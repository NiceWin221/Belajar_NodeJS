const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(fileBuffer);
};

// mencari contact
const findContact = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
};

// menuliskan / menimpa file contact.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek duplikat nama
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

// menghapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  return saveContacts(filteredContacts);
};

// mengubah data contact
const updateContacts = (value) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== value.oldNama);
  delete value.oldNama;
  filteredContacts.push(value);
  saveContacts(filteredContacts);
};

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts };

// -----------------------------------------------------------------------------------------------------

// adasd

// asd

// asdasd

// sad
