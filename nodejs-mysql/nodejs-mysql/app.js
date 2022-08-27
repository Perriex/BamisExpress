const express = require("express");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var collection = "components";
var imgcollection = "posters";
var database = "bartarha";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(database);
  var myobj = { _id: "order", queue: [] };
  dbo.collection(collection).insertOne(myobj, function (err, res) {
    if (err) console.log("error in creating db.");
    db.close();
  });
});
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(database);
  var myobj = {};
  dbo.collection(imgcollection).insertOne(myobj, function (err, res) {
    if (err) console.log("error in creating db.");
    db.close();
  });
});

const app = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/orders", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    var query = { _id: "order" };
    dbo
      .collection(collection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result[0].queue);
        db.close();
      });
  });
});

app.post("/orders", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    var myquery = { _id: "order" };
    var newvalues = { $set: { queue: req.body } };
    dbo
      .collection(collection)
      .updateOne(myquery, newvalues, function (err, func) {
        if (err) throw err;
        res.send(200);
        db.close();
      });
  });
});

app.post("/add/poster", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    var newvalues = { name: req.body.name, hash: req.body.img };
    dbo.collection(imgcollection).insertOne(newvalues, function (err, func) {
      if (err) throw err;
      res.send(200);
      db.close();
    });
  });
});

app.get("/get/poster", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    if (req.query.name) var query = { name: req.query.name };
    else var query = null;
    dbo
      .collection(imgcollection)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result.filter((item) => item.hash?.length > 0));
        db.close();
      });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
