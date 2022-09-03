module.exports = (app) => {
  const text = require("../controller/text.controller");

  app.post("/text/edit/:section", text.editTextsOfSection);

  app.get("/text/:section", text.getTextsOfSection);

  app.post("/text/:section", text.addTextsOfSection);
};
