"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express = require("express");
const path_1 = __importDefault(require("path"));
const logging_1 = require("./general/logging");
const cors_1 = require("./general/cors");
const validation_1 = require("./general/validation");
const apiUsers_1 = require("./users/apiUsers");
const apiTours_1 = require("./tours/apiTours");
const apiDownloadImage_1 = require("./tours/apiDownloadImage");
const errorHandling_1 = require("./general/errorHandling");
const dateParam_1 = require("./general/reqParams/dateParam");
exports.routerV1 = express_1.Router();
//practice
const authenticator = (req, res, next) => {
    const username = "tony";
    req.user = username;
    next();
};
//practice
exports.routerV1.use(authenticator);
exports.routerV1.use(logging_1.logger);
exports.routerV1.use(cors_1.apiCors);
exports.routerV1.use(validation_1.apiValidation);
//practice
exports.routerV1.get("/headers", (req, res, next) => res.json(req.headers));
//practice
exports.routerV1.param("fromDate", dateParam_1.dateParam);
exports.routerV1.param("toDate", dateParam_1.dateParam);
//practice
exports.routerV1.get("/bookings/:fromDate/:toDate", (req, res, next) => res.json(req.params));
exports.routerV1.use("/static", express.static(path_1.default.resolve("./", "public", "img")));
exports.routerV1.get("/", (req, res) => {
    res.send("TourBooking API");
});
exports.routerV1.use("/users", apiUsers_1.userRouter);
exports.routerV1.use("/tours", apiTours_1.toursRouter);
exports.routerV1.get("/static/download/:id", apiDownloadImage_1.apiDownloadImage);
//error handler should be put after all other middlewares
exports.routerV1.use(errorHandling_1.apiErrorHandler);