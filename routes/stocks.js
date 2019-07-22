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
  Stocks: [{ symbol: String, volume: Number, price: Number, date: Number, _id: ObjectId }],
  SoldStocks: [{ symbol: String, volume: Number, price: Number, date: Number, _id: ObjectId }],
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
      let date = new Date();
      stockInfo.date = date.getTime();
      updatedStocks.push(req.body.stockInfo);
      updatedBalance -= (req.body.stockInfo.price * req.body.stockInfo.volume);
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

router.put("/sellStocks", (req,res) => {
  console.log(req.body);
  UserPortfolioModel.findOne({ "Email": req.body.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      let stocks = portfolio.Stocks;
      let updatedStocks = [];
      let updatedSoldStocks = portfolio.SoldStocks;
      let updatedBalance = portfolio.Balance;
      let stockInfo = req.body.stockInfo;
      let sellPrice = req.body.sellPrice;
      let date = new Date();
      let soldStock = {
        symbol: stockInfo.symbol,
        volume: stockInfo.volume,
        price: stockInfo.price,
        date: date.getTime()
      }
      for (let i=0; i<stocks.length; i++) {
        if (stockInfo.symbol === stocks[i].symbol && stockInfo.date === stocks[i].date) {
          updatedBalance += (sellPrice * stockInfo.volume);
          console.log(soldStock);
          updatedSoldStocks.push(soldStock);
        } else {
          updatedStocks.push(stocks[i]);
        }
      }
      UserPortfolioModel.findOneAndUpdate(
        { "Email": req.body.email },
        {
          "Stocks": updatedStocks,
          "SoldStocks": updatedSoldStocks,
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
  UserPortfolioModel.findOne({'Email': newUser.Email},
    (err, user) => {
      if (err) {
        return handleError(err);
      }
      if (!user) {
        newUser._id = mongoose.Types.ObjectId();
        let newUserPortfolioModel = new UserPortfolioModel(newUser);
        newUserPortfolioModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        })
        res.status(201).json({ error: null, emailInUse: false, newUser });
      } else {
        res.status(201).json({ error: null, emailInUse: true });
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
