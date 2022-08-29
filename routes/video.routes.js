module.exports = (app) => {
  const video = require("../controller/video.controller");

  app.post("/video", video.addVideo);

  app.get("/video", video.getVideoByName);
};
