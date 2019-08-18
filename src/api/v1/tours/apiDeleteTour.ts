import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { PublicInfo, APIError } from "../../model/shared/messages";

export const apiDeleteTour: RequestHandler = (req, res, next) => {
  const tourID = req.params.id;
  const tourIndex = DataStore.tours.findIndex((item: any) => item.id == tourID);
  if (tourIndex > -1) {
    DataStore.tours.splice(tourIndex);
    // res.json(new PublicInfo("Tour deleted", 200));
    res.json(PublicInfo.infoDeleted());
  } else {
    // next(new APIError("Validation Error", "Tour not found.", 400));
    next(APIError.errNotFound());
  }
};
