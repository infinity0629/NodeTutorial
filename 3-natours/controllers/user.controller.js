import fs from "fs";
import config from "../utils.js";

const users = JSON.parse(
  fs.readFileSync(`${config.currentDir}/dev-data/data/users.json`)
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export default { getAllUsers, createUser, getUser, updateUser, deleteUser };
