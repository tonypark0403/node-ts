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

app.use(authenticator);
app.use(logger); // applied to all

app.use("/static", express.static(path.resolve("./", "public", "img")));

app.get("/", (req, res, next) => {
  res.send("Tour Booking API");
});

// app.get("/tours", logger, apiGetTours); - only this is applied
app.get("/tours", logger, apiGetTours);

app.get("/tours/:id", apiGetTourDetail);

app.post("/tours", urlEncodedParser, apiCreateTour);

app.delete("/tours/:id", apiDeleteTour);

// app.put("/tours/:id", jsonParser, apiUpdateTour);
app.patch("/tours/:id", jsonParser, apiUpdateTour);

app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
