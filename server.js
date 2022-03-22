const express = require("express");

const cors = require("cors");

const Events = require("./models/events");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// leave until later

require("./connection");

app.use(cors());

// app to use api routes

const router = express.Router();

app.use("/api", router);

////////////////////////ALL ROUTES

router.get("/view-events", function (req, res) {
  Events.find().then((response) => {
    res.json(response);
  });
});

router.get("/view-event-by-id/:id", function (req, res) {
  Events.findOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

router.delete("/delete-event-by-id/:id", function (req, res) {
  Events.deleteOne({ _id: req.params.id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      // if nothing deleted update the app/user
      return res.json({ deletedCount: 0 });
    });
});

// CREATE new product
router.post("/create-event", function (req, res) {
  var newEvent = new Events();
  var theFormData = req.body;
  console.log(">>> ", theFormData);

  Object.assign(newEvent, theFormData);

  newEvent.save().then((response) => {
    return res.json(response);
  });
});

// end CREATE new writer

router.get("/view-event-by-firstname/:name", function (req, res) {
  // console.log(req.params.name);

  Events.findOne({ firstname: req.params.name }).then((response) => {
    res.json(response);
  });
});

// catch bad endpoints on the api route only

router.get("/*", (req, res) => {
  return res.json({ result: "hey, no hacking please...." });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Phew!, listening on port ${PORT}`);
});
