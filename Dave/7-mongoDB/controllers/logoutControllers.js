const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // NO Content
  const refreshToken = cookies.jwt;

  // is refresh token is db
  const foundUser = userDB.users.find((person) => person.refreshToken == refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204); // NO Content
  }
  // delete refresh token in db
  const otherUsers = userDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
  const currentUsers = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUsers]);
  await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users));
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204); // NO Content
};

module.exports = { handleLogout };
