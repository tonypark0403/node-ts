// import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../../model/shared/tourSummary";
import { TourFilters } from "../../../model/shared/tourFilters";
import { db } from "../../../db/db";
import * as dbModel from "../../../db/model_generated";

export const apiGetTours: RequestHandler = (req, res, next) => {
  //test
  // db.any("select * from tours").then(tours => console.log(tours));
  const filters = new TourFilters(req.query);
  db.any("select * from tours where ${condition:raw}", {
    condition: filters.getCondition()
  }).then((tours: dbModel.tours[]) => {
    // const filteredData = tours.filter((item: any) => {
    //   let conditions = [
    //     filters.location ? item.location == filters.location : true,
    //     filters.priceMin ? item.price > filters.priceMin : true,
    //     filters.priceMax ? item.price < filters.priceMax : true
    //   ];
    //   return conditions.every(value => value == true);
    // });
    res.json(tours.map((item: any) => new TourSummary(item)));
  });
};
