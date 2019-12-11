require("module-alias/register");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routesManager = require("@features/routes");
const { apiPort } = require("@config/config.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routesManager);

const server = app.listen(apiPort, () => {
  console.log(`Server is listening on ${server.address().port}`);
});
