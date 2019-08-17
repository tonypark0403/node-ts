import * as dbModel from "../../../db/model_generated";
// import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { PublicInfo, APIError } from "../../../model/shared/messages";
import { db, pgPromise } from "../../../db/db";
const caseConverter = require("change-case-object");

export const apiUpdateTour: RequestHandler = (req, res, next) => {
  const tourID = req.params.id;
  const data = caseConverter.snakeCase(req.body);
  // res.json(data);
  const sql =
    pgPromise.helpers.update(data, undefined, "tours") + " where id = ${id}";
  db.none(sql, { id: tourID }).then(() => {
    res.json(PublicInfo.infoUpdated({ updatedData: data }));
  });
};
