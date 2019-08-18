// import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../../model/shared/tourSummary";
import { TourFilters } from "../../../model/shared/tourFilters";
import { db } from "../../../db/db";
import * as dbModel from "../../../db/model_generated";
import { cacheSave } from "../general/caching";

export const apiGetTours: RequestHandler = (req, res, next) => {
  //test
  // db.any("select * from tours").then(tours => console.log(tours));
  const filters = new TourFilters(req.query);
  db.any("select * from tours where ${condition:raw}", {
    condition: filters.getCondition()
  }).then((tours: dbModel.tours[]) => {
    console.log("Database Query...");
    const responseData = tours.map((item: any) => new TourSummary(item));
    cacheSave(responseData)(req, res, next);
    res.json(responseData);
  });
};
