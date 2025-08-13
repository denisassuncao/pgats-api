const users = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function addUser(user) {
  if (findUserByUsername(user.username)) {
    return false;
  }
  users.push(user);
  return true;
}

function getAllUsers() {
  return users;
}

module.exports = { findUserByUsername, addUser, getAllUsers };
