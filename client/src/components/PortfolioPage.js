import React, { Component } from 'react';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import PortfolioInformation from './PortfolioInformation';

class PortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      gotStockInfo: false
    }
  }

  getUserStocks = () => {
    axios.get("http://localhost:8080/stockapi/getUser", {params: { email: localStorage.getItem('email'), password: '' }})
      .then(res => {
        if (res.data.correctInfo) {
          console.log(res.data.portfolio.Stocks);
          this.setState({ stockData: res.data.portfolio.Stocks, gotStockInfo: true });
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
          { menuItem: 'Bought Stocks', render: () => <Tab.Pane><PortfolioInformation type="Buy" stockData={this.state.stockData} /></Tab.Pane> },
          { menuItem: 'Sold Stocks', render: () => <Tab.Pane><PortfolioInformation type="Sell" stockData={this.state.stockData} /></Tab.Pane> },
          { menuItem: 'All Trades', render: () => <Tab.Pane><PortfolioInformation type="Transaction" stockData={this.state.stockData} /></Tab.Pane> }
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
