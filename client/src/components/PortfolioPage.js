import React, { Component } from 'react';
import axios from 'axios';

class PortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    }
  }

  getUserStocks = () => {
    axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0/tops'
    })
      .then (res => this.setState({stockData: res.data}))
  }

  componentDidMount = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.getUserStocks();
    } else {
      window.location.replace('/');
    }
  }

  render() {
    return (
      <div>
        <h1>Your Portfolio</h1>
      </div>
    );
  }
}

export default PortfolioPage;
