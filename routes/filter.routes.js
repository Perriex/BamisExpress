module.exports = (app) => {
  const filter = require("../controller/filter.controller");

  app.get("/filter/:type", filter.getFilter);

  app.post("/filter/:type", filter.changeFilter);
};
