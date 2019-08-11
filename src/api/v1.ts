import { Router } from "express";
import express = require("express");
import path from "path";

import { logger } from "./general/logging";
import { apiCors } from "./general/cors";
import { apiValidation } from "./general/validation";
import { userRouter } from "./users/apiUsers";
import { toursRouter } from "./tours/apiTours";
import { apiDownloadImage } from "./tours/apiDownloadImage";
import { apiErrorHandler } from "./general/errorHandling";
import { CustomRequestHandler } from "../model/express";
import { dateParam } from "./general/reqParams/dateParam";

export const routerV1 = Router();

//practice
const authenticator: CustomRequestHandler = (req, res, next) => {
  const username = "tony";
  req.user = username;
  next();
};
//practice
routerV1.use(authenticator);

routerV1.use(logger);

routerV1.use(apiCors);

routerV1.use(apiValidation);

//practice
routerV1.get("/headers", (req, res, next) => res.json(req.headers));
//practice
routerV1.param("fromDate", dateParam);
routerV1.param("toDate", dateParam);
//practice
routerV1.get("/bookings/:fromDate/:toDate", (req, res, next) =>
  res.json(req.params)
);

routerV1.use("/static", express.static(path.resolve("./", "public", "img")));

routerV1.get("/", (req, res) => {
  res.send("TourBooking API");
});

routerV1.use("/users", userRouter);

routerV1.use("/tours", toursRouter);

routerV1.get("/static/download/:id", apiDownloadImage);

//error handler should be put after all other middlewares
routerV1.use(apiErrorHandler);
