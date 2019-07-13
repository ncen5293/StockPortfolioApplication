import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getStockData = () => {
    const stockEndpoint = 'https://ws-api.iextrading.com/1.0';
    fetch(stockEndpoint)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    this.getStockData();
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Home;
