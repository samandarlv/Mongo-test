const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/User");

const addUser = async (req, res) => {
  try {
    // AddUser
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res.status(400).send({ message: "Ma'lumotlarni to'liq yuboring" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({ message: "Bunday email mavjud" });
    }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ message: "User qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    // getUsers
    const users = await User.find();
    if (users.length == 0) {
      return res.status(400).send({ message: "Users not found" });
    }
    res.json(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    // getUserById
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res.status(400).send({ message: "Ma'lumotlarni to'liq yuboring" });
    }
    const updated = await User.updateOne(
      { _id: req.params.id },
      { $set: { name: name, email: email, password: password } }
    );
    if (updated.modifiedCount == 0) {
      return res.status(200).send({ message: "User is updated" });
    }
    res.status(400).send({ message: "User isn't updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const deleted = await User.deleteOne({ _id: id });
    if (deleted.deletedCount == 1) {
      return res.status(200).send({ message: "User is deleted" });
    }
    res.status(400).send({ message: "User isn't deleted" });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    // loginUser
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Email not found" });
    }
    if (user.password == password) {
      return res.status(200).send({ message: "Tizimga kirdingiz" });
    }
    res.status(400).send({ message: "Password isn't corect" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUserById,
};
