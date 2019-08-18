// import { DataStore } from "../../../data/data";
import { RequestHandler } from "express";
import { PublicInfo, APIError } from "../../../model/shared/messages";
import { Tour } from "../../../db_mongo/tour";

export const apiDeleteTour: RequestHandler = (req, res, next) => {
  const tourID = req.params.id;
  Tour.findByIdAndRemove(tourID).then(() => {
    res.json(PublicInfo.infoDeleted());
  });
};
