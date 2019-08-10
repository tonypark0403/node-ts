import express from "express";
import Constants from "./common/Constants";

const app = express();

app.get(Constants.Router.ROOT, (req, res, next) => {
  res.send("Tour Booking API");
});

app.get(Constants.Router.TOURS, (req, res, next) => {
  res.send("Get a list of tours...");
});

app.get(Constants.Router.TOURS, (req, res, next) => {
  res.send("Add a new tour...");
});

app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
