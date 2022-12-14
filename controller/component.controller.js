var MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/mongo.config");

exports.getOrders = (req, res) => {
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo
      .collection(dbConfig.collection)
      .find({ _id: "order" })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result[0].queue);
        db.close();
      });
  });
};

exports.changeOrder = (req, res) => {
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
      .updateOne({ _id: "order" }, newvalues, function (err, func) {
        if (err) throw err;
        res.sendStatus(200);
        db.close();
      });
  });
};
