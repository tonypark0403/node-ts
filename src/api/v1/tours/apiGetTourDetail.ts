import { DataStore } from "../../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../../model/shared/tourSummary";
import { TourDetail } from "../../../model/shared/tourDetail";
import { fileMapper } from "../general/static";
import { APIError } from "../../../model/shared/messages";
import * as dbModelExt from "../../../db/model_extensions";
import { db, pgPromise } from "../../../db/db";

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
  const tourId = req.params.id;
  db.one(
    "select t.*,\
          (select json_agg(reviews)\
            from reviews where tour_id = ${id}\
          ) as reviews\
          from tours as t\
          where t.id = ${id}",
    {
      id: tourId
    }
  )
    .then((data: dbModelExt.toursWithReviews) => {
      const imgNames = data.img || [];
      const imgURLs = imgNames.map(fileMapper(req.app.get("env")));
      res.json(new TourDetail(data, imgURLs));
    })
    .catch(err => {
      // console.log(err);
      if (err instanceof pgPromise.errors.QueryResultError) {
        next(APIError.errNotFound());
      } else {
        next(APIError.errInvalidQueryParameter());
      }
    });
};
