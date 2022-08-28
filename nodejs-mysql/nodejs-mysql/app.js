var express = require("express");
var cors = require("cors");

var app = express();
var port = process.env.PORT || 8081;
var corsOptions = {
  origin: "http://localhost:8080",
};

require("./database/mongo.setup")();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "This is a bartarha front-dynamic yohoo!" });
});

require("./routes/components.routes")(app);
require("./routes/poster.routes")(app);
require("./routes/text.routes")(app);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
