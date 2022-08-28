module.exports = (app) => {
  const poster = require("../controller/poster.controller");

  app.post("/add/poster", poster.addPoster);

  app.get("/get/poster", poster.getPosterByName);
};
