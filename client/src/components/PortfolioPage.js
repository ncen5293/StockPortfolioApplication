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
    axios.get("http://localhost:8080/stockapi/getUser", {params: { email: localStorage.getItem('email'), password: '' }})
      .then(res => {
        if (res.data.correctInfo) {
          console.log(res.data.portfolio.Stocks);
          this.setState({ stockData: res.data.portfolio.Stocks});
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
    return (
      <div>
        <h1>{`Portfolio Page - Available Balance: $${localStorage.getItem('balance')}`}</h1>
      </div>
    );
  }
}

export default PortfolioPage;
