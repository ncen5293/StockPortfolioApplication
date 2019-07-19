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
  Email: {type: String, unique: true},
  Password: String,
  Stocks: [{ symbol: String, volume: Number, buyPrice: Number, buyDate: Number }],
  Balance: Number
});

const UserPortfolioModel = mongoose.model('user', UserPortfolioSchema);

router.put("/updatePortfolio", (req,res) => {
  console.log(req.body);
  UserPortfolioModel.findOne({ "Email": req.body.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      let updatedStocks = portfolio.Stocks;
      let updatedBalance = portfolio.Balance;
      let stockInfo = req.body.stockInfo;
      let buyDate = new Date();
      stockInfo.buyDate = buyDate.getTime();
      updatedStocks.push(req.body.stockInfo);
      updatedBalance -= (req.body.stockInfo.buyPrice * req.body.stockInfo.volume);
      if (portfolio.Balance > 0) {
        UserPortfolioModel.findOneAndUpdate(
          { "Email": req.body.email },
          {
            "Stocks": updatedStocks,
            "Balance": updatedBalance
          },
          { new: true },
          (err, updatedPortfolio) => {
            if (err) {
              throw err;
            } else {
              console.log("Updated");
              res.send({updatedPortfolio, hasEnoughMoney: true});
            }
          }
        );
      } else {
        res.send({portfolio, hasEnoughMoney: false});
      }
  });
})

router.get("/getUser", (req,res) => {
  console.log(req.query);
  let correctInfo = true;
  const loginInfo = {email: req.query.email, password: req.query.password};
  UserPortfolioModel.findOne({ "Email": loginInfo.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      console.log(portfolio);
      if (portfolio && (portfolio.Password === loginInfo.password || loginInfo.password === '')) {
        console.log('logged in');
        res.status(201).json({ error: null, portfolio, correctInfo });
      } else {
        console.log('wrong info');
        correctInfo = false;
        res.status(201).json({ error: null, portfolio, correctInfo });
      }

  });
})

router.post("/setUser", (req, res) => {
  console.log(req.body);
  let newUser = req.body;
  let emailInUse = false;
  UserPortfolioModel.findOne({'Email': newUser.Email},
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
        res.status(201).json({ error: null, emailInUse, newUser });
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
