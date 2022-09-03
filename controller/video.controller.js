var MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/mongo.config");

exports.addVideo = (req, res) => {
  if (!req.body.name || !req.body.video) {
    res.sendStatus(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var newvalues = { name: req.body.name, hash: req.body.video };

    dbo
      .collection(dbConfig.videocollection)
      .insertOne(newvalues, function (err, func) {
        if (err) throw err;
        res.sendStatus(200);
        db.close();
      });
  });
};

exports.getVideoByName = (req, res) => {
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    if (req.query.name) var query = { name: req.query.name };
    else var query = null;
    dbo
      .collection(dbConfig.videocollection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result.filter((item) => item.hash?.length > 0));
        db.close();
      });
  });
};

exports.deleteVideoByQuery = (req, res) => {
  if (!req.query.name) {
    res.sendStatus(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var myquery = { name: req.query.name };
    dbo
      .collection(dbConfig.videocollection)
      .deleteOne(myquery, function (err, func) {
        if (err) throw err;
        res.sendStatus(200);
        db.close();
      });
  });
};