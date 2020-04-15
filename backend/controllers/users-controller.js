const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../models/user");
const HttpError = require("../models/http-error");
let DUMMY_USERS = [
  {
    username: "Sergey",
    id: "u1",
    email: "hello@mail.ru",
    password: "testtest",
  },
];

const getListOfUsers = (req, res, next) => {
  res.json({ users: { DUMMY_USERS } });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }
  const { name, email, password, places } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signing up failed", 500));
  }
  if (existingUser) {
    return next(new HttpError("User exists already, please login", 422));
  }

  let createdUser = new User({
    name,
    email,
    image:
      "https://sun9-21.userapi.com/c543106/v543106223/64a1e/_UTpjDzILqc.jpg",
    password,
    places,
  });
  try {
    await createdUser.save();
    console.log("Saved new user!");
  } catch (err) {
    const error = new HttpError("Creating user failed", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("could not identify user", 401);
  }
  res.json({ message: "Logged in" });
};

exports.getListOfUsers = getListOfUsers;
exports.signup = signup;
exports.login = login;
