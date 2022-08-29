var MongoClient = require("mongodb").MongoClient;

module.exports = () => {
  const dbConfig = require("../config/mongo.config");

  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var myobj = [
      { _id: "order", queue: [] },
      { _id: "consultation", queue: [] },
      { _id: "tutoring", queue: [] },
      { _id: "webinar", queue: [] },
    ];
    dbo.collection(dbConfig.collection).insertMany(myobj, function (err, res) {
      if (err) console.log("error in creating db 1.");
      db.close();
    });
  });

  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var myobj = { _id: 0 };
    dbo
      .collection(dbConfig.imgcollection)
      .insertOne(myobj, function (err, res) {
        if (err) console.log("error in creating db 2.");
        db.close();
      });
  });

  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var myobj = { _id: 0 };
    dbo
      .collection(dbConfig.textcollection)
      .insertOne(myobj, function (err, res) {
        if (err) console.log("error in creating db 3.");
        db.close();
      });
  });

  MongoClient.connect(dbConfig.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    var myobj = { _id: 0 };
    dbo
      .collection(dbConfig.videocollection)
      .insertOne(myobj, function (err, res) {
        if (err) console.log("error in creating db 4.");
        db.close();
      });
  });
};
