const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};


const createById = (id) => {
  let user = userModel.createUserById(id);
  return user;  
};

function isUserValid(user, password) {
  return user.password === password;
}


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  createById,
};
