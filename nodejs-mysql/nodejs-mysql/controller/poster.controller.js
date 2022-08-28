var MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/mongo.config");

exports.addPoster = (req, res) => {
  if (req.body.name.length === 0 || req.body.img.length === 0) {
    res.send(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var newvalues = { name: req.body.name, hash: req.body.img, link : req.body.link };

    dbo
      .collection(dbConfig.imgcollection)
      .insertOne(newvalues, function (err, func) {
        if (err) throw err;
        res.send(200);
        db.close();
      });
  });
};

exports.getPosterByName = (req, res) => {
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    if (req.query.name) var query = { name: req.query.name };
    else var query = null;
    dbo
      .collection(dbConfig.imgcollection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result.filter((item) => item.hash?.length > 0));
        db.close();
      });
  });
};
