const models = require("@models");
const codes = require("@config/error-codes");
const httpErrors = require("http-errors");

const createStation = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw httpErrors.BadRequest(codes.stations.MISSING_STATION_NAME);
    if (name.length < 3)
      throw httpErrors.BadRequest(codes.stations.STATION_NAME_TOO_SHORT);

    const newStation = await models.Station.create({
      name
    });
    res.send(newStation);
  } catch (error) {
    return next(error);
  }
};

const getStation = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) throw httpErrors.BadRequest(codes.stations.MISSING_STATION_ID);

    const station = await models.Station.findByPk(id, {
      include: {
        model: models.Car,
        required: false
      }
    });
    if (!station) throw httpErrors.NotFound(codes.stations.STATION_NOT_FOUND);

    res.send(station);
  } catch (error) {
    return next(error);
  }
};

const updateStation = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id) throw httpErrors.BadRequest(codes.stations.MISSING_STATION_ID);
    if (name && name.length < 3)
      throw httpErrors.BadRequest(codes.stations.STATION_NAME_TOO_SHORT);
    let station = await models.Station.findByPk(id);
    if (!station) throw httpErrors.NotFound(codes.stations.STATION_NOT_FOUND);

    station = await station.update({
      name: name || station.name
    });
    res.send(station);
  } catch (error) {
    return next(error);
  }
};

const deleteStation = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) throw httpErrors.BadRequest(codes.stations.MISSING_STATION_ID);

    const station = await models.Station.findByPk(id);
    if (!station) throw httpErrors.NotFound(codes.stations.STATION_NOT_FOUND);

    await station.destroy();
    res.send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createStation,
  deleteStation,
  getStation,
  updateStation
};
