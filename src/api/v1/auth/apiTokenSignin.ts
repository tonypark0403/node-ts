import { RequestHandler } from "express";
import * as firebaseAdmin from "firebase-admin";
import fs from "fs";
import path from "path";
import * as dbModel from "../../../db/model_generated";
import { db, pgPromise } from "../../../db/db";
import { CustomRequestHandler } from "../../../model/express";
import { apiSessionGenerate } from "./apiSessionGenerate";

export const apiTokenSignin: CustomRequestHandler = (req, res, next) => {
  const confFile = process.env.FIREBASE_CONF || "firebase_dev.json";
  const confFilePath = path.resolve("./src", "config", confFile);
  console.log(confFilePath);
  const conf = JSON.parse(fs.readFileSync(confFilePath).toString());

  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(conf),
      databaseURL: "https://tourapp-6f667.firebaseio.com"
    });
  }

  firebaseAdmin
    .auth()
    .verifyIdToken(req.body.idtoken)
    .then(decodedToken => {
      //   res.json(decodedToken);
      const userID = decodedToken.uid;

      db.one("select * from users where id = ${id}", { id: userID })
        .then((user: dbModel.users) => {
          //   res.json(user);
          req.user = user;
          apiSessionGenerate(req, res, next);
        })
        .catch(err => {
          if (err.code == pgPromise.errors.queryResultErrorCode.noData) {
            const user: dbModel.users = {
              id: userID,
              email: decodedToken.email,
              name: decodedToken.name
            };
            db.none(pgPromise.helpers.insert(user, undefined, "users")).then(
              () => {
                // res.json(user);
                req.user = user;
                apiSessionGenerate(req, res, next);
              }
            );
          }
        });
    });
};
