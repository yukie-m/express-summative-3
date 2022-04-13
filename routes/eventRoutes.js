const express = require("express");
const router = express.Router();

const app = express();
app.use("/api", router);

const Events = require("../models/eventModel");
const Comments = require("../models/commentModel");

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

router.get("/view-events-by-user/:email", function (req, res) {
  Events.find({ userEmail: req.params.email }).then((response) => {
    res.json(response);
  });
});

router.get("/view-event-by-category/:category", function (req, res) {
  console.log(">>>>>>>>> ", req.params.category);

  Events.find()
    .where("category")
    .equals(req.params.category)
    .then((response) => {
      res.json(response);
    });
});

// add like
router.patch("/add-like/:id", function (req, res) {
  let action = req.body.action;
  let counter = action == "up" ? 1 : -1;

  Events.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: counter } },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({ success: false, error: error });
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

// CREATE new event
router.post("/create-event", function (req, res) {
  var newEvent = new Events();
  var theFormData = req.body;
  console.log(">>> ", theFormData);

  Object.assign(newEvent, theFormData);

  newEvent
    .save()
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      // if there was an error return it to the app/user
      return res.json({ error: true, error_type: err });
    });
});

// CREATE new comment
router.post("/create-comment/:id", function (req, res) {
  let comment = new Comments();
  let formData = req.body;
  console.log(">>> ", formData);

  Object.assign(comment, formData);

  Events.updateOne(
    { _id: req.params.id },
    {
      $push: { comments: comment },
      $currentDate: { lastModified: true },
    }
  )
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      // if there was an error return it to the app/user
      return res.json({ error: true, error_type: err });
    });
});

router.get("/view-event-by-name/:name", function (req, res) {
  console.log(req.params.name);

  Events.findOne({ name: req.params.name }).then((response) => {
    res.json(response);
  });
});

module.exports = router;
