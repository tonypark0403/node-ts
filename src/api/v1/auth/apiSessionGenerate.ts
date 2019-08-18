import { RequestHandler } from "express";
import { CustomRequestHandler } from "../../../model/express";
import * as jwt from "jsonwebtoken";
import {
  sessionTokenSecret,
  sessionTokenLifetime
} from "../../../config/sessionConf";

export const apiSessionGenerate: CustomRequestHandler = (req, res, next) => {
  if (req.user) {
    //console.log(req.user);
    const token = jwt.sign({ userId: req.user.id }, sessionTokenSecret, {
      expiresIn: sessionTokenLifetime
    });
    res.status(200).json({ auth: true, token: token });
  }
};
