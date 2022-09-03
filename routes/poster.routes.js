module.exports = (app) => {
  const poster = require("../controller/poster.controller");

  app.post("/poster", poster.addPoster);

  app.get("/poster", poster.getPosterByName);

  app.delete("/poster", poster.deletePosterByQuery);
};
