module.exports = (app) => {
  const components = require("../controller/component.controller");

  app.get("/orders", components.getOrders);

  app.post("/orders", components.changeOrder);

  app.get("/filter/:type", components.getFilter);

  app.post("/filter/:type", components.changeFilter);


};
