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
      url: 'https://api.iextrading.com/1.0/tops'
    })
      .then (res => this.setState({stockData: res.data}))
  }

  componentDidMount = () => {
    this.getStockData();
  }

  render() {
    return (
      <div>
        <StockTable stockData={this.state.stockData} tableName="Tops" />
      </div>
    );
  }
}

export default Home;
