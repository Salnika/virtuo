const models = require("@models");
const codes = require("@config/error-codes");
const httpErrors = require("http-errors");

const createCar = async (req, res, next) => {
  try {
    const { name, stationId } = req.body;
    if (!name) throw httpErrors.BadRequest(codes.cars.MISSING_CAR_NAME);
    if (!stationId) throw httpErrors.BadRequest(codes.cars.MISSING_STATION_ID);
    if (name.length < 3)
      throw httpErrors.BadRequest(codes.cars.CAR_NAME_TOO_SHORT);
    const station = await models.Station.findByPk(stationId);
    if (!station) throw httpErrors.BadRequest(codes.cars.STATION_NOT_FOUND);
    const newCar = await models.Car.create({
      name
    });

    await newCar.setStation(station);
    res.send(newCar);
  } catch (error) {
    return next(error);
  }
};

const getCar = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) throw httpErrors.BadRequest(codes.cars.MISSING_CAR_ID);

    const car = await models.Car.findByPk(id, {
      include: {
        model: models.Station,
        required: false
      }
    });
    if (!car) throw httpErrors.NotFound(codes.cars.CAR_NOT_FOUND);

    res.send(car);
  } catch (error) {
    return next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id, name, available, stationId } = req.body;
    if (!id) throw httpErrors.BadRequest(codes.cars.MISSING_CAR_ID);
    if (name && name.length < 3)
      throw httpErrors.BadRequest(codes.cars.CAR_NAME_TOO_SHORT);
    let car = await models.Car.findByPk(id, {
      include: {
        model: models.Station
      }
    });
    if (!car) throw httpErrors.NotFound(codes.cars.CAR_NOT_FOUND);

    car = await car.update({
      name: name || car.name,
      available: available
        ? available === "false"
          ? false
          : true
        : car.available
    });
    if (stationId && stationId !== car.Station.id) {
      const station = await models.Station.findByPk(stationId);
      if (!station) throw httpErrors.BadRequest(codes.cars.STATION_NOT_FOUND);
      car.setStation(station);
    }
    res.send(car);
  } catch (error) {
    return next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) throw httpErrors.BadRequest(codes.cars.MISSING_CAR_ID);

    const car = await models.Car.findByPk(id);
    if (!car) throw httpErrors.NotFound(codes.cars.CAR_NOT_FOUND);

    await car.destroy();
    res.send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCar,
  deleteCar,
  getCar,
  updateCar
};
