const userDB = {
  users: require("../model//users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUsers = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: "User and password are Required." }); // Bad request
  const duplicate = userDB.users.find((person) => (person.username == user));
  if (duplicate) return res.sendStatus(409); // Conflict for duplicate Users
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create new users
    const newUsers = { username: user, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUsers]);
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users));
    console.log(userDB.users);
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUsers };
