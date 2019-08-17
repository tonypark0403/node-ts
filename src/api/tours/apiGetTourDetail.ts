import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../model/shared/tourSummary";
import { TourDetail } from "../../model/shared/tourDetail";
import { fileMapper } from "../general/static";
import { APIError } from "../../model/shared/messages";
import * as dbModel from "../../db/model_generated";
import { db } from "../../db/db";

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
  const tourId = req.params.id;
  // const selectedTour = DataStore.tours.find((tour: any) => tour.id === tourId);
  db.one("select * from tours where id = ${id}", { id: tourId }).then(
    (selectedTour: dbModel.tours) => {
      if (selectedTour) {
        //this is typescript so check in case of the value is null, make an empty array to use map
        const imgNames = selectedTour.img || [];
        const imageURLs = imgNames.map(fileMapper(req.app.get("env")));
        // const selectedReviews = DataStore.reviews.filter(
        //   (item: any) => item.tourID === tourId
        // );
        db.any("select * from reviews where tour_id = ${id}", {
          id: tourId
        }).then((selectedReviews: dbModel.reviews[]) => {
          res.json(new TourDetail(selectedTour, selectedReviews, imageURLs));
        });
      } else {
        // res.json({ status: "failed", message: "Element not found" });
        res.json(APIError.errNotFound());
      }
    }
  );
};
