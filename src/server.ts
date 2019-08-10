import express from "express";
import { DataStore } from "./data/data";
import { apiGetTours } from "./api/tours/apiGetTours";
import { apiGetTourDetail } from "./api/tours/apiGetTourDetail";

const app = express();

// console.log(JSON.parse(JSON.stringify(DataStore.tours)));

app.get("/", (req, res, next) => {
  res.send("Tour Booking API");
});

app.get("/tours", apiGetTours);

app.get("/tours:/id", apiGetTourDetail);

app.post("/tours", (req, res, next) => {
  res.send("Add a new tour...");
});

app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
