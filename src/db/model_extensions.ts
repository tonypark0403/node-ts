import * as dbModel from "./model_generated";

export interface toursWithReviews extends dbModel.tours {
  reviews: dbModel.reviews[];
}
