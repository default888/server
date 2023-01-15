import RestaurantModel from "../models/Restaurant.js";

export const getAllrestaurant = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить список ресторанов",
    });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    RestaurantModel.findById(req.params.id, (error, doc) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Не удалось загрузить ресторан",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Ресторнан не найден",
        });
      }

      res.json(doc);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить ресторан",
    });
  }
};

export const getRestaurantByName = async (req, res) => {
  try {
    RestaurantModel.findOne(
      {
        name: req.params.name,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Не удалось загрузить ресторан",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Ресторнан не найден",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить ресторан",
    });
  }
};

export const removeRestaurant = async (req, res) => {
  try {
    RestaurantModel.findByIdAndDelete({ _id: req.params.id }, (error, doc) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Не удалось удалить ресторан",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Ресторнан не найден",
        });
      }
      res.json({
        message: "Ресторан удален",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить ресторан",
    });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const doc = new RestaurantModel({
      name: req.body.displayName.replace(/ /g, "-").toLowerCase(),
      displayName: req.body.displayName,
      logo: req.body.logo,
      menu: req.body.menu,
    });

    const restaurant = await doc.save();

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось добавить ресторан",
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    await RestaurantModel.updateOne(
      { _id: req.params.id },
      {
        name: req.body.displayName.replace(/ /g, "-").toLowerCase(),
        displayName: req.body.displayName,
        logo: req.body.logo,
        menu: req.body.menu,
      }
    );
    res.json({
      message: "Ресторан обновлен",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось добавить ресторан",
    });
  }
};
