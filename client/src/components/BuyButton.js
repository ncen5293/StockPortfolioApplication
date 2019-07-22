import React, { Component } from 'react';
import { Button, Modal, Form, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';

class BuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuyOpen: false,
      isWarningOpen: false,
      isConfirmOpen: false,
      numberOfStocks: 0,
      warningMessage: ''
    }
  }

  isBuyable = () => {
    const stockData = this.props.data;
    if (stockData.time === 'N/A') {
      return false;
    } else {
      return true;
    }
  }

  toggleBuyModal = () => {
    if (this.isBuyable() && localStorage.getItem('isLoggedIn') === 'true') {
      this.setState({isBuyOpen: true});
    } else if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.setState({isBuyOpen: false, isWarningOpen: true, warningMessage: 'Log-in before you can buy stocks!'})
    } else {
      this.setState({isBuyOpen: false, isWarningOpen: true, warningMessage: 'This stock does not exist!'});
    }
  }

  closeBuyModal = () => {
    this.setState({isBuyOpen: false});
  }

  closeWarningModal = () => {
    this.setState({isWarningOpen: false});
  }

  attemptBuyStocks = (event) => {
    this.setState({isConfirmOpen: true, numberOfStocks: event.target.amount.value});
  }

  closeConfirmModal = () => {
    this.setState({isConfirmOpen: false});
  }

  confirmBuyStocks = (event) => {
    this.buyStocks();
    this.setState({isConfirmOpen: false, isBuyOpen: false});
  }

  buyStocks = () => {
    const stockInfo = {
      volume: this.state.numberOfStocks,
      symbol: this.props.data.symbol,
      price: this.props.data.price
    }
    axios.put("http://localhost:8080/stockapi/updatePortfolio", { email:localStorage.getItem('email'), stockInfo:stockInfo })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('balance', res.data.updatedPortfolio.Balance);
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <div>
        <Button compact size="mini" onClick={this.toggleBuyModal} icon='shopping cart' labelPosition='left' content="Buy Stocks"/>
        <Modal size="mini" open={this.state.isBuyOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeBuyModal} >
          <Modal.Header>Buy {this.props.data.symbol} Stocks </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.attemptBuyStocks} >
              <Form.Field>
                <label>Stock Amount</label>
                <input defaultValue={1} min={1} type="number" name="amount" placeholder='0' style={{'width':'65%'}} />
                <span className="salePrice" >@ ${this.props.data.price}</span>
              </Form.Field>
              <Button primary type='submit'>Buy</Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal basic size='mini' open={this.state.isConfirmOpen} closeOnEscape={false} closeOnDimmerClick={false} onClose={this.closeConfirmModal} >
          <Header icon='shopping cart' content='Buy Confirmation' />
          <Modal.Content>
            <p>
              {this.state.numberOfStocks} Stock(s) @ ${this.props.data.price} for {this.props.data.symbol}?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted color='green' onClick={this.confirmBuyStocks}>
              <Icon name='checkmark' /> Confirm
            </Button>
            <Button basic inverted color='red' onClick={this.closeConfirmModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal basic size='mini' open={this.state.isWarningOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeWarningModal} >
          <Header icon='ban' content='Unable to buy this stock' />
          <Modal.Content>
            <p>
              {this.state.warningMessage}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted color='red' onClick={this.closeWarningModal}>
              <Icon name='remove' /> Understood
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default BuyButton;
