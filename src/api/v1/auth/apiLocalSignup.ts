import { RequestHandler } from "express";
import * as bcrypt from "bcrypt";
import { DataStore } from "../../../data/data";

const SALT_ROUNDS = 12;

export const apiLocalSignup: RequestHandler = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS).then(hash => {
    console.log(hash);
    DataStore.accounts.push({
      email: req.body.email,
      password: hash
    });
    res.send("Account created!");
  });
};
