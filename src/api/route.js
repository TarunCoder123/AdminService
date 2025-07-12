const authRouter = require("./auth/auth.routes");
const propertyRouter = require("./property/property.route");

const app = require("express")();

const routes = () => {
  app.route(`/auth`, authRouter);
  app.route("/properties", propertyRouter);
};

module.exports = routes();
