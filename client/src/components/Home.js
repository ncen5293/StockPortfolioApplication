import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import StockTable from './StockTable';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      searchInput: ''
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
    // setInterval(() => {
      this.getStockData();
    // }, 1000);
  }

  onSearchEnter = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.setState({searchInput: ''});
    }
  }

  onSearchChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  render() {
    return (
      <div>
        <Navigation onKeyPress={this.onSearchEnter} onSearchChange={this.onSearchChange} searchInput={this.state.searchInput}/>
        <StockTable stockData={this.state.stockData} tableName="Tops 10" />
      </div>
    );
  }
}

export default Home;
