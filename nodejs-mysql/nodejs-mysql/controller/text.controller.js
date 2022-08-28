var MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/mongo.config");

exports.getTextOfSection = (req, res) => {
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    if (req.params.section) var query = { key: req.params.section };
    else var query = null;
    dbo
      .collection(dbConfig.textcollection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        if (result.length === 0) res.send(404);
        if (req.params.section) res.send(result[0]);
        else res.send(result);

        db.close();
      });
  });
};

exports.editTextOfSection = (req, res) => {
  if (!req.params.section) {
    res.send(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var newvalues = { key: req.params.section, text: req.body.text };
    dbo
      .collection(dbConfig.textcollection)
      .insertOne(newvalues, function (err, func) {
        if (err) throw err;
        res.send(200);
        db.close();
      });
  });
};

exports.getTitleOfSection = (req, res) => {
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    if (req.params.section) var query = { key: req.params.section };
    else var query = null;
    dbo
      .collection(dbConfig.titlecollection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        if (result.length === 0) res.send(404);
        if (req.params.section) res.send(result[0]);
        else res.send(result);

        db.close();
      });
  });
};

exports.editTitleOfSection = (req, res) => {
  if (!req.params.section) {
    res.send(400);
    return;
  }
  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var newvalues = { key: req.params.section, text: req.body.text };
    dbo
      .collection(dbConfig.titlecollection)
      .insertOne(newvalues, function (err, func) {
        if (err) throw err;
        res.send(200);
        db.close();
      });
  });
};
