const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUsers = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ message: "User and password are Required." }); // Bad request
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict for duplicate Users
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create new users
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUsers };
