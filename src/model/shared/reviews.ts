import * as dbModel from "../../db/model_generated";

export class Review {
  tourID: string;
  reviewTitle: string;
  reviewLongText: string;
  stars: number;
  constructor(data: dbModel.reviews) {
    this.tourID = data.tour_id;
    this.reviewTitle = data.review_title;
    this.reviewLongText = data.review_long_text || "";
    this.stars = data.stars;
  }
}
