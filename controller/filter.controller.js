var MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/mongo.config");

exports.getFilter = (req, res) => {
  if (!req.params.type) {
    res.sendStatus(404);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo
      .collection(dbConfig.collection)
      .find({ _id: req.params.type })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result[0].queue);
        db.close();
      });
  });
};

exports.changeFilter = (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var newvalues = { $set: { queue: req.body } };
    dbo
      .collection(dbConfig.collection)
      .updateOne({ _id: req.params.type }, newvalues, function (err, func) {
        if (err) throw err;
        res.sendStatus(200);
        db.close();
      });
  });
};
