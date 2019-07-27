import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';

class SellButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSellConfirmOpen: false
    }
  }

  sellStocks = () => {
    axios.put(`http://localhost:8080/stocks/users/${localStorage.getItem('email')}/sell`, {
      email: localStorage.getItem('email'),
      stockInfo: this.props.stockInfo,
      sellPrice: this.props.sellPrice
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('balance', res.data.updatedBalance);
        window.location.reload();
      })
      .catch(error => {
        console.error(error)
      })
  }

  toggleSellModal = () => {
    this.setState((state) => {
      return {isSellConfirmOpen: !state.isSellConfirmOpen};
    });
  }

  render() {
    return (
      <div>
        <Button size="mini" onClick={this.toggleSellModal} color='blue' icon='shopping cart' labelPosition='left' content="Sell"/>
        <Modal size="mini" open={this.state.isSellConfirmOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleSellModal} >
          <Modal.Header>Sell {this.props.stockInfo.symbol} Stocks?</Modal.Header>
          <Modal.Content>
            {`Sell ${this.props.stockInfo.volume} stocks @ $${this.props.stockInfo.price.toFixed(2)}? Total: $${this.props.stockInfo.volume * this.props.stockInfo.price.toFixed(2)}`}
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.sellStocks} >Sell Stocks</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default SellButton;
