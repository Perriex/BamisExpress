var express = require("express");
var cors = require("cors");

var app = express();
var port = process.env.PORT || 8081;
var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000"],
};

require("./database/mongo.setup")();
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "This is a bartarha front-dynamic yohoo!" });
});

require("./routes/components.routes")(app);
require("./routes/poster.routes")(app);
require("./routes/video.routes")(app);
require("./routes/filter.routes")(app);
require("./routes/text.routes")(app);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
