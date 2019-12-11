const express = require("express");
const {
  createStation,
  deleteStation,
  getStation,
  updateStation
} = require("./controller");
const stationRouterManager = express();
const stationRouter = express.Router();

stationRouter.get("/", getStation);
stationRouter.post("/", createStation);
stationRouter.put("/", updateStation);
stationRouter.delete("/", deleteStation);

stationRouterManager.use("/stations", stationRouter);

module.exports = stationRouterManager;
