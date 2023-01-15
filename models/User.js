import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
