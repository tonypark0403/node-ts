import { TourSummary } from "./tourSummary";
import { Review } from "./reviews";
import * as dbModelExt from "../../db/model_extensions";

export class TourDetail extends TourSummary {
  tourCategory: string;
  tourDescription: string;
  price: number;
  currency: string;
  img: string[];
  reviews: Review[];
  constructor(data: dbModelExt.toursWithReviews, tourImages: string[]) {
    super(data);
    this.tourCategory = data.tour_category;
    this.tourDescription = data.tour_description || "";
    this.price = data.price;
    this.currency = data.currency;
    this.img = tourImages;
    this.reviews = data.reviews.map((item: any) => new Review(item));
  }
}
