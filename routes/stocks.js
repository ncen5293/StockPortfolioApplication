const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

mongoose.connect("mongodb://localhost:27017/stock");

const userPortfolioDb = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserPortfolioSchema = new Schema({
  _id: ObjectId,
  Name: String,
  Email: String,
  Stocks: [{ symbol: String, volume: Number, buyPrice: Number }],
  Balance: Number
});

const UserPortfolioModel = mongoose.model('passenger', UserPortfolioSchema);

router.post("/getUser", (req,res) => {
  console.log(req.body);
  UserPortfolioModel.find({ "Name": req.body.Name },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      console.log(portfolio);
      res.status(201).json({ error: null, portfolio });
  });
})

router.post("/setUser", (req, res) => {
  console.log(req.body);
  let newUser = req.body;
  let emailInUse = false;
  PassengerModel.findOne({'Email': newUser.Email},
    (err, user) => {
      if (err) {
        return handleError(err);
      }
      if (!user) {
        newUser._id = mongoose.Types.ObjectId();;
        let newUserPortfolioModel = new UserPortfolioModel(newUser);
        newUserPortfolioModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        })
        res.status(201).json({ error: null, emailInUse });
      } else {
        emailInUse = true;
        res.status(201).json({ error: null, emailInUse });
      }
  });
})

userPortfolioDb.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
userPortfolioDb.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

module.exports = router;
