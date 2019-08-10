import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../model/shared/tourSummary";
import { TourDetail } from "../../model/shared/tourDetail";
import { fileMapper } from "../general/static";

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
  const tourId = req.params.id;
  const selectedTour = DataStore.tours.find((tour: any) => tour.id === tourId);
  if (selectedTour) {
    const imageURLs = selectedTour.img.map(fileMapper(req.app.get("env")));
    const selectedReviews = DataStore.reviews.filter(
      (item: any) => item.tourID === tourId
    );
    res.json(new TourDetail(selectedTour, selectedReviews, imageURLs));
  } else {
    res.json({ status: "failed", message: "Element not found" });
  }
};
