const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
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

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed", 422);
  }
  const { username, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  throw new HttpError("Could not create user, email exists", 422);
  let newUser = {
    username,
    email,
    id: uuid(),
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ user: newUser });
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
