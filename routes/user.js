const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/set_name", (req, res, next) => {
  console.log(req.body);
  User.findOneAndUpdate({ _id: req.body._id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.put("/update_record", (req, res, next) => {
  User.findOneAndUpdate({ _id: req.body._id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/scores", (req, res) => {
  User.find({})
    .sort({ wins: -1 })
    .then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
