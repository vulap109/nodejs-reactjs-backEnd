import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

const createUser = async (email, password, userName) => {
  let hashPass = hashPassword(password);
  await db.User.create({
    username: userName,
    email: email,
    password: hashPass,
  });
};

const getAllUsersList = async () => {
  //test relationship
  let getUser = await db.User.findAll({
    attributes: ["username", "email"],
    where: { id: 1 },
    include: {
      model: db.Group,
      attributes: ["name"],
      include: { model: db.Role, attributes: ["url", "description"] },
    },
  });
  console.log(">>> check get user relationship: ", getUser);

  let user = [];
  user = await db.User.findAll();
  return user;
};

const getUserListPerPage = () => {};

const deleteUser = async (id) => {
  let user = [];
  // const query = "DELETE FROM users WHERE id = ?";
  // const data = [id];
  // user = await sqlExec(query, data);
  user = await db.User.destroy({
    where: {
      id: id,
    },
  });
  return user;
};

module.exports = {
  createUser,
  hashPassword,
  getAllUsersList,
  getUserListPerPage,
  deleteUser,
};
