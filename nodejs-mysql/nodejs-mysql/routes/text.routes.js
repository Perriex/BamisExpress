module.exports = (app) => {
  const text = require("../controller/text.controller");

  app.get("/get/text/:section?", text.getTextOfSection);

  app.post("/add/text/:section", text.editTextOfSection);

  app.get("/get/title/:section?", text.getTitleOfSection);

  app.post("/add/title/:section", text.editTitleOfSection);


};
