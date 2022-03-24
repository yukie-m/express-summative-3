const express = require("express");
const router = express.Router();

////////////////////////ALL ROUTES

router.get("/view-products", function (req, res) {
  Products.find().then((response) => {
    res.json(response);
  });
});

router.get("/view-product-by-id/:id", function (req, res) {
  Products.findOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

router.delete("/delete-product-by-id/:id", function (req, res) {
  Products.deleteOne({ _id: req.params.id }).then((response) => {
    res.json(response);
  });
});

// CREATE new product
router.post("/create-product", function (req, res) {
  var newProduct = new Products();
  var theFormData = req.body;
  console.log(">>> ", theFormData);

  Object.assign(newProduct, theFormData);

  newProduct.save().then((response) => {
    return res.json(response);
  });
});

// end CREATE new writer

router.get("/view-product-by-firstname/:name", function (req, res) {
  // console.log(req.params.name);

  Products.findOne({ firstname: req.params.name }).then((response) => {
    res.json(response);
  });
});

module.exports = router;
