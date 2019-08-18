import { RequestHandler } from "express";
import { APIError, PublicInfo } from "../../../model/shared/messages";
import { Tour } from "../../../db_mongo/tour";

export const apiCreateTour: RequestHandler = (req, res, next) => {
  const requiredFields = ["tourTitle", "location"];
  const givenFields = Object.getOwnPropertyNames(req.body);
  if (!requiredFields.every(field => givenFields.includes(field))) {
    // return next(
    // new APIError("Data missing", "Not all required fields supplied.", 400)
    // );
    return next(APIError.errMissingBody());
  }
  const newTour = {
    // id: uuid(), - mongodb generates uuid automatically
    location: req.body.location || "",
    tourTitle: req.body.tourTitle || "",
    tourCategory: req.body.tourCategory || "",
    tourDescription: req.body.tourDescription || "",
    price: req.body.price || 0,
    currency: req.body.currency || "",
    img: []
  };
  // DataStore.tours.push(newTour);
  new Tour(newTour).save(() => {
    res.json(PublicInfo.infoCreated({ newTour: newTour }));
  });
};
