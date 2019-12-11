
const express = require("express");
const {
  createCar,
  deleteCar,
  getCar,
  updateCar
} = require("./controller");
const carRouterManager = express();
const carRouter = express.Router();

carRouter.get("/", getCar);
carRouter.post("/", createCar);
carRouter.put("/", updateCar);
carRouter.delete("/", deleteCar);

carRouterManager.use("/cars", carRouter);

module.exports = carRouterManager;
