import * as mongoose from "mongoose";
import { MONGO } from "../common/Constants";
export function connectMongo() {
  mongoose.connect(
    `mongodb+srv://toursapi:${MONGO.PASSWORD}@toursapi-mngh1.mongodb.net/test`
  );
}
