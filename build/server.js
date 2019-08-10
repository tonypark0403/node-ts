"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Constants_1 = __importDefault(require("./common/Constants"));
const app = express_1.default();
app.get(Constants_1.default.Router.ROOT, (req, res, next) => {
    res.send("Tour Booking API");
});
app.get(Constants_1.default.Router.TOURS, (req, res, next) => {
    res.send("Get a list of tours...");
});
app.get(Constants_1.default.Router.TOURS, (req, res, next) => {
    res.send("Add a new tour...");
});
app.listen(process.env.PORT || 8091, () => console.log("Server started..."));
