import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { registerValidation, loginValidation, restaurantCreateValidation } from "./validations.js";
import { UserController, RestaurantController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect("mongodb+srv://admin:BkzY2DxzW8yXeNV@cluster0.qz2wlpf.mongodb.net/restaurant?retryWrites=true&w=majority")
  .then(() => console.log("DB ok"))
  .catch((error) => console.log("DB error", error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/restaurant/uploads", express.static("uploads"));

app.post("/restaurant/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/restaurant/uploads/${req.file.originalname}`,
  });
});

app.get("/restaurant", RestaurantController.getAllrestaurant);
// app.get("/restaurant/:id", RestaurantController.getRestaurantById);
app.get("/restaurant/:name", RestaurantController.getRestaurantByName);
app.post(
  "/restaurant/",
  checkAuth,
  restaurantCreateValidation,
  handleValidationErrors,
  RestaurantController.createRestaurant
);
app.delete("/restaurant/:id", checkAuth, RestaurantController.removeRestaurant);
app.patch(
  "/restaurant/:id",
  checkAuth,
  restaurantCreateValidation,
  handleValidationErrors,
  RestaurantController.updateRestaurant
);

app.post("/account/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/account/registration", registerValidation, handleValidationErrors, UserController.register);
app.get("/account", checkAuth, UserController.getUser);

app.listen(1200, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("OK");
});
