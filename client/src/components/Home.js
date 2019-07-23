import React, { Component } from 'react';
import axios from 'axios';
import StockTable from './StockTable';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    }
  }

  getStockData = () => {
    axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0/tops/last'
    })
      .then (res => {
        console.log('got iex stock info')
        this.setState({stockData: res.data})
      })
  }

  componentDidMount = () => {
    this.getStockData();
  }

  render() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return (
        <div>
          <StockTable
            stockData={this.state.stockData}
            tableName={`Tops - Available Balance: $${parseFloat(localStorage.getItem('balance')).toFixed(2)}`}
          />
        </div>
      );
    } else {
      return (
        <div>
          <StockTable stockData={this.state.stockData} tableName="Tops" />
        </div>
      );
    }
  }
}

export default Home;
