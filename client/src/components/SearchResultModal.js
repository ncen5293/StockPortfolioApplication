import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';
import BuyButton from './BuyButton';
import StockInformation from './StockInformation';

class SearchResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: {}
    }
  }

  getStockData = (searchValue) => {
    axios({
      method: 'GET',
      url: `https://api.iextrading.com/1.0/deep?symbols=${searchValue}`
    })
      .then (res => this.setState({stockData: res.data}))
  }

  componentDidUpdate = () => {
    if (localStorage.hasOwnProperty('searchValue')) {
      this.getStockData(localStorage.getItem('searchValue'));
    }
  }

  render() {
    return (
      <div>
        <Modal open={this.props.isSearchOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.props.closeSearchModal} >
          <Modal.Header>{this.state.stockData.symbol} Stock Information</Modal.Header>
          <Modal.Content>
            <StockInformation
              data={this.state.stockData}
            />
            <BuyButton
              data={this.state.stockData}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SearchResultModal;
