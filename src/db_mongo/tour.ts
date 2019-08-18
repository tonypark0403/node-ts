import * as mongoose from "mongoose";
import { DataStore } from "../data/data";

const tourSchema = new mongoose.Schema({
  location: String,
  tourTitle: String,
  tourCategory: String,
  tourDescription: String,
  price: Number,
  currency: String,
  img: [String],
  reviews: [
    {
      reviewTitle: String,
      reviewLongText: String,
      stars: Number
    }
  ]
});

export const Tour = mongoose.model("Tour", tourSchema);

//Test Data

const testItem1 = DataStore.tours[0];
testItem1.reviews = DataStore.reviews;

const testItem2 = DataStore.tours[1];

Tour.find().then(data => {
  if (data.length == 0) {
    new Tour(testItem1).save();
    new Tour(testItem2).save();
  }
});
