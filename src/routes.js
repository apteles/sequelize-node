const express = require("express");
const UserController = require("../src/controllers/UserController");
const AddressController = require("../src/controllers/AddressController");
const TechsController = require("../src/controllers/TechsController");
const ReportController = require("../src/controllers/ReportController");
const routes = express.Router();
require("./database");

routes.post("/users", UserController.create);
routes.get("/users", UserController.index);

routes.post("/users/:user_id/addresses", AddressController.create);
routes.get("/users/:user_id/addresses", AddressController.index);

routes.post("/users/:user_id/techs", TechsController.create);
routes.get("/users/:user_id/techs", TechsController.index);
routes.delete("/users/:user_id/techs", TechsController.delete);

routes.get("/report", ReportController.show);

module.exports = routes;
