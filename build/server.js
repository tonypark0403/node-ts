"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const apiGetTours_1 = require("./api/tours/apiGetTours");
const apiGetTourDetail_1 = require("./api/tours/apiGetTourDetail");
const apiCreateTour_1 = require("./api/tours/apiCreateTour");
const app = express_1.default();
const jsonParser = bodyParser.json();
// app.use(bodyParser.urlencoded({ extended: true }));
// const jsonParser = bodyParser.urlencoded({ extended: true });
// console.log(JSON.parse(JSON.stringify(DataStore.tours)));
app.get("/", (req, res, next) => {
    res.send("Tour Booking API");
});
app.get("/tours", apiGetTours_1.apiGetTours);
app.get("/tours:/id", apiGetTourDetail_1.apiGetTourDetail);
app.post("/tours", jsonParser, apiCreateTour_1.apiCreateTour);
app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
