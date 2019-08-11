import { Router } from "express";
import { apiCheckTourFilters } from "./apiCheckTourFilters";
import { apiGetTourDetail } from "./apiGetTourDetail";
import { apiCreateTour } from "./apiCreateTour";
import { apiDeleteTour } from "./apiDeleteTour";
import { apiUpdateTour } from "./apiUpdateTour";
import { apiUploadImage } from "./apiUploadImage";
import { apiGetTours } from "./apiGetTours";
import { jsonParser } from "../general/bodyParser";

export const toursRouter = Router();

// const jsonParser = bodyParser.json();
// app.use(bodyParser.urlencoded({ extended: true }));
// const urlEncodedParser = bodyParser.urlencoded({ extended: true });
// const jsonParser = bodyParser.urlencoded({ extended: true });
// console.log(JSON.parse(JSON.stringify(DataStore.tours)));

toursRouter
  .route("/")
  .get(apiCheckTourFilters, apiGetTours)
  .post(jsonParser, apiCreateTour);

toursRouter
  .route("/:id")
  .get(apiGetTourDetail)
  .delete(apiDeleteTour)
  .patch(jsonParser, apiUpdateTour);

toursRouter.post("/:id/img", apiUploadImage);
