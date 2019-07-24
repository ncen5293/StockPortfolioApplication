import React, { Component } from 'react';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import PortfolioInformation from './PortfolioInformation';

class PortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boughtStocks: [],
      soldStocks: [],
      allStocks: [],
      gotStockInfo: false
    }
  }

  getUserStocks = () => {
    axios.get("http://localhost:8080/stocks/users", {params: { email: localStorage.getItem('email'), password: '' }})
      .then(res => {
        if (res.data.correctInfo) {
          this.setState({
            boughtStocks: res.data.portfolio.Stocks,
            soldStocks: res.data.portfolio.SoldStocks,
            allStocks: res.data.portfolio.AllStocks,
            gotStockInfo: true
          });
        } else {
          this.setState({loginError: true});
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.getUserStocks();
    } else {
      window.location.replace('/');
    }
  }

  render() {
    if (this.state.gotStockInfo) {
      console.log(this.state.boughtStocks);
      console.log(this.state.soldStocks);
      const boughtStocks = this.state.boughtStocks;
      const soldStocks = this.state.soldStocks;
      const allStocks = this.state.allStocks;
      const panes = [
        { menuItem: 'Current Stocks', pane: (<Tab.Pane key="buyTab" ><PortfolioInformation type="Buy" stockData={boughtStocks} /></Tab.Pane>) },
        { menuItem: 'Sold Stocks', pane: (<Tab.Pane key="soldTab" ><PortfolioInformation type="Sell" stockData={soldStocks} /></Tab.Pane>) },
        { menuItem: 'All Transactions', pane: (<Tab.Pane key="allTab" ><PortfolioInformation type="All" stockData={allStocks} /></Tab.Pane>) }
      ]
      return (
        <div>
          <h1>{`Available Balance: $${parseFloat(localStorage.getItem('balance')).toFixed(2)}`}</h1>
          <Tab panes={ panes } renderActiveOnly={false} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>{`Available Balance: $${localStorage.getItem('balance')}`}</h1>
        </div>
      );
    }

  }
}

export default PortfolioPage;
