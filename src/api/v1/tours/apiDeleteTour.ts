// import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { PublicInfo, APIError } from "../../../model/shared/messages";
import { db } from "../../../db/db";

export const apiDeleteTour: RequestHandler = (req, res, next) => {
  const tourID = req.params.id;
  // db.none("delete from tours where id = ${id}", { id: tourID }).then(() => {
  //   res.json(PublicInfo.infoDeleted());
  // });
  db.none("delete from tours where id = '" + tourID + "'").then(() => {
    res.json(PublicInfo.infoDeleted());
  });
};
