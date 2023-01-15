import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  displayName: String,
  logo: String,
  menu: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Restaurant", RestaurantSchema);
