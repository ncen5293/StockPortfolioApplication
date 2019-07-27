const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
  Stocks: [{ symbol: String, volume: Number, price: Number, date: Number, reason: String }],
  SoldStocks: [{ symbol: String, volume: Number, price: Number, date: Number, reason: String }],
  AllStocks: [{ symbol: String, volume: Number, price: Number, date: Number, reason: String }],
  Balance: Number
});

const UserPortfolioModel = mongoose.model('user', UserPortfolioSchema);

router.put("/users/:email/buy", (req,res) => {
  console.log(req.body);
  UserPortfolioModel.findOne({ "Email": req.body.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      let updatedStocks = portfolio.Stocks;
      let updatedBalance = portfolio.Balance;
      let updatedAllStocks = portfolio.AllStocks;
      let stockInfo = req.body.stockInfo;
      let date = new Date();
      stockInfo.date = date.getTime();
      stockInfo.reason = "Buy";
      updatedStocks.push(stockInfo);
      updatedAllStocks.push(stockInfo);
      updatedBalance -= (stockInfo.price * stockInfo.volume);
      if (updatedBalance > 0) {
        UserPortfolioModel.findOneAndUpdate(
          { "Email": req.body.email },
          {
            "Stocks": updatedStocks,
            "AllStocks": updatedAllStocks,
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

router.put("/users/:email/sell", (req,res) => {
  console.log(req.body);
  UserPortfolioModel.findOne({ "Email": req.body.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      let stocks = portfolio.Stocks;
      let updatedStocks = [];
      let updatedSoldStocks = portfolio.SoldStocks;
      let updatedAllStocks = portfolio.AllStocks;
      let updatedBalance = portfolio.Balance;
      let stockInfo = req.body.stockInfo;
      let sellPrice = req.body.sellPrice;
      let date = new Date();
      let soldStock = {
        symbol: stockInfo.symbol,
        volume: stockInfo.volume,
        price: sellPrice,
        date: date.getTime(),
        reason: "Sell"
      }
      for (let i=0; i<stocks.length; i++) {
        if (stockInfo.symbol === stocks[i].symbol && stockInfo.date === stocks[i].date) {
          updatedBalance += (sellPrice * stockInfo.volume);
          console.log(soldStock);
          updatedSoldStocks.push(soldStock);
          updatedAllStocks.push(soldStock);
        } else {
          updatedStocks.push(stocks[i]);
        }
      }
      UserPortfolioModel.findOneAndUpdate(
        { "Email": req.body.email },
        {
          "Stocks": updatedStocks,
          "SoldStocks": updatedSoldStocks,
          "AllStocks": updatedAllStocks,
          "Balance": updatedBalance
        },
        { new: true },
        (err, updatedPortfolio) => {
          if (err) {
            throw err;
          } else {
            console.log("Updated");
            res.send({updatedPortfolio, updatedBalance, hasEnoughMoney: true});
          }
        }
      );
  });
})

router.get("/users/:email", (req,res) => {
  console.log(req.query);
  const loginInfo = { email: req.query.email, password: req.query.password };
  UserPortfolioModel.findOne({ "Email": loginInfo.email },
    (err, portfolio) => {
      if (err) {
        return handleError(err);
      }
      console.log(portfolio);
      if (portfolio) {
        if (loginInfo.password === '') {
          res.status(201).json({ error: null, portfolio, correctInfo: true });
        } else {
          bcrypt.compare(loginInfo.password, portfolio.Password, function(err, gotPassword) {
            if (gotPassword) {
              console.log('logged in');
              res.status(201).json({ error: null, portfolio, correctInfo: true });
            } else {
              console.log('wrong info');
              res.status(201).json({ error: null, portfolio, correctInfo: false });
            }
          });
        }
      } else {
        console.log('wrong info');
        res.status(201).json({ error: null, portfolio, correctInfo: false });
      }

  });
})

router.post("/users/:email", (req, res) => {
  console.log(req.body);
  let newUser = req.body;
  let userPassword = req.body.Password;
  bcrypt.hash(userPassword, 10, function(err, passwordHash) {
    newUser.Password = passwordHash;
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
