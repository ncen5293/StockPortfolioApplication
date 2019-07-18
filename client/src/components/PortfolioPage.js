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
    this.getUserStocks();
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default PortfolioPage;
