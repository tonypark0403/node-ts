import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { TourSummary } from "../../model/shared/tourSummary";
import { TourDetail } from "../../model/shared/tourDetail";

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
  const tourId = req.params.id;
  const selectedTour = DataStore.tours.find((tour: any) => tour.id === tourId);
  if (selectedTour) {
    const selectedReviews = DataStore.reviews.filter(
      (item: any) => item.tourId === tourId
    );
    res.json(new TourDetail(selectedTour, selectedReviews));
  } else {
    res.json({ status: "failed", message: "Element not found" });
  }
};
