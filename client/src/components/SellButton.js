import React, { Component } from 'react';
import { Button, Modal, Form, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';

class SellButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSellConfirmOpen: false
    }
  }

  sellStocks = () => {
    axios.put("http://localhost:8080/stockapi/sellStocks", { email: localStorage.getItem('email'), stockInfo: this.props.stockInfo })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error)
      })
    window.location.reload();
  }

  closeSellModal = () => {
    this.setState({ isSellConfirmOpen: false });
  }

  render() {
    return (
      <div>
        <Button size="mini" onClick={this.toggleSellModal} icon='shopping cart' labelPosition='left' content="Sell"/>
        <Modal size="mini" open={this.state.isSellConfirmOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeSellModal} >
          <Modal.Header>Sell {this.props.stockInfo.symbol} Stocks?</Modal.Header>
          <Modal.Content>
            <Button primary onClick={this.sellStocks} >Sell Stocks</Button>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SellButton;
