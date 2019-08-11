import express from "express";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";

import { DataStore } from "./data/data";
import { apiGetTours } from "./api/tours/apiGetTours";
import { apiGetTourDetail } from "./api/tours/apiGetTourDetail";
import { apiCreateTour } from "./api/tours/apiCreateTour";
import { apiDeleteTour } from "./api/tours/apiDeleteTour";
import { apiUpdateTour } from "./api/tours/apiUpdateTour";
import { CustomRequestHandler } from "./model/express";
import { apiUploadImage } from "./api/tours/apiUploadImage";
import { apiErrorHandler } from "./api/general/errorHandling";
import { APIError } from "./model/shared/messages";
import { dateParam } from "./api/general/reqParams/dateParam";
import { apiCheckTourFilters } from "./api/tours/apiCheckTourFilters";
import { apiDownloadImage } from "./api/tours/apiDownloadImage";

const app = express();

const jsonParser = bodyParser.json();
// app.use(bodyParser.urlencoded({ extended: true }));
const urlEncodedParser = bodyParser.urlencoded({ extended: true });
// const jsonParser = bodyParser.urlencoded({ extended: true });

// console.log(JSON.parse(JSON.stringify(DataStore.tours)));

const authenticator: CustomRequestHandler = (req, res, next) => {
  const username = "tony";
  req.user = username;
  next();
};

const logger = morgan("dev");
// const logger: CustomRequestHandler = (req, res, next) => {
//   console.log(
//     "User: " +
//       req.user +
//       " - " +
//       new Date() +
//       " - " +
//       req.method +
//       " Request to " +
//       req.path
//   );
//   next();
// };

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE"
  });
  next();
});

app.disable("x-powered-by");
app.use(authenticator);
app.use(logger); // applied to all

//middleware to test for access method /headers
//only json
app.use((req, res, next) => {
  if (req.accepts("application/json")) {
    next();
  } else {
    next(
      new APIError(
        "Content Type not supported",
        "This API only supports application/json",
        400
      )
    );
  }
});

app.get("/headers", (req, res, next) => res.json(req.headers));

app.use("/static", express.static(path.resolve("./", "public", "img")));

app.get("/", (req, res, next) => {
  res.send("Tour Booking API");
});

// app.param("fromDate", dateParam);
// app.param("toDate", dateParam);

// app.get("/bookings/:fromDate/:toDate", (req, res, next) =>
//   res.json(req.params)
// );

// app.get("/tours", logger, apiGetTours); - only this is applied
app.get("/tours", apiCheckTourFilters, apiGetTours);

app.get("/tours/:id", apiGetTourDetail);

app.post("/tours", urlEncodedParser, apiCreateTour);

app.delete("/tours/:id", apiDeleteTour);

// app.put("/tours/:id", jsonParser, apiUpdateTour);
app.patch("/tours/:id", jsonParser, apiUpdateTour);

app.post("/tours/:id/img", apiUploadImage);

app.get("/static/download/:id", apiDownloadImage);

//error handler should be put after all other middlewares
app.use(apiErrorHandler);

app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
