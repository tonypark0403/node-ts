import { DataStore } from "../../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../../model/shared/tourSummary";
import { TourFilters } from "../../../model/shared/tourFilters";
import { Tour } from "../../../db_mongo/tour";

export const apiGetTours: RequestHandler = (req, res, next) => {
  const filters = new TourFilters(req.query);
  Tour.find(filters.asObject()).then(data => {
    res.json(data.map((item: any) => new TourSummary(item)));
  })
};
