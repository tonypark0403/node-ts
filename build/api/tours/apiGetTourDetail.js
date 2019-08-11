"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const tourDetail_1 = require("../../model/shared/tourDetail");
const static_1 = require("../general/static");
const messages_1 = require("../../model/shared/messages");
exports.apiGetTourDetail = (req, res, next) => {
    const tourId = req.params.id;
    const selectedTour = data_1.DataStore.tours.find((tour) => tour.id === tourId);
    if (selectedTour) {
        const imageURLs = selectedTour.img.map(static_1.fileMapper(req.app.get("env")));
        const selectedReviews = data_1.DataStore.reviews.filter((item) => item.tourID === tourId);
        res.json(new tourDetail_1.TourDetail(selectedTour, selectedReviews, imageURLs));
    }
    else {
        // res.json({ status: "failed", message: "Element not found" });
        res.json(messages_1.APIError.errNotFound());
    }
};
