module.exports = (app) => {
  const text = require("../controller/text.controller");

  app.get("/text/:section", text.getTextsOfSection);

  app.post("/text/:section", text.addTextsOfSection);

  app.post("/edit/text/:section", text.editTextsOfSection);
};
