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
    axios.get("http://localhost:8080/stockapi/getUser", {params: { email: localStorage.getItem('email'), password: '' }})
      .then(res => {
        if (res.data.correctInfo) {
          console.log(res.data.portfolio.Stocks);
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
      return (
        <Tab panes={[
          { menuItem: 'Bought Stocks', render: () => <Tab.Pane><PortfolioInformation type="Buy" stockData={this.state.boughtStocks} /></Tab.Pane> },
          { menuItem: 'Sold Stocks', render: () => <Tab.Pane><PortfolioInformation type="Sell" stockData={this.state.boughtStocks} /></Tab.Pane> }
        ]}
        />
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
