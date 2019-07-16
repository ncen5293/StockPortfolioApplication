import React, { Component } from 'react';
import { Button, Modal, Form, Header, Icon } from 'semantic-ui-react';

class BuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuyOpen: false,
      isWarningOpen: false,
      isConfirmOpen: false,
      numberOfStocks: 0
    }
  }

  isBuyable = () => {
    const stockData = this.props.data;
    if (stockData.volume <= 0 || stockData.marketPercent <= 0) {
      return false;
    } else {
      return true;
    }
  }

  toggleBuyModal = () => {
    if (this.isBuyable()) {
      this.setState({isBuyOpen: true});
    } else {
      this.setState({isBuyOpen: false, isWarningOpen: true});
    }
  }

  closeBuyModal = () => {
    this.setState({isBuyOpen: false});
  }

  closeWarningModal = () => {
    this.setState({isWarningOpen: false});
  }

  buyStocks = (event) => {
    this.setState({isConfirmOpen: true, numberOfStocks: event.target.amount.value});
  }

  closeConfirmModal = () => {
    this.setState({isConfirmOpen: false});
  }

  confirmBuyStocks = (event) => {
    this.setState({isConfirmOpen: false, isBuyOpen: false});
  }

  render() {
    return (
      <div>
        <Button compact size="mini" onClick={this.toggleBuyModal} icon='shopping cart' labelPosition='left' content="Buy Stocks"/>
        <Modal size="mini" open={this.state.isBuyOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeBuyModal} >
          <Modal.Header>Buy {this.props.data.symbol} Stocks </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.buyStocks} >
              <Form.Field>
                <label>Stock Amount</label>
                <input defaultValue={1} min="1" max={this.props.data.volume} type="number" name="amount" placeholder='0' style={{'width':'65%'}} />
                <span className="salePrice" >@ ${this.props.data.lastSalePrice}</span>
              </Form.Field>
              <Button primary type='submit'>Buy</Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal basic size='mini' open={this.state.isConfirmOpen} closeOnEscape={false} closeOnDimmerClick={false} onClose={this.closeConfirmModal} >
          <Header icon='shopping cart' content='Buy Confirmation' />
          <Modal.Content>
            <p>
              {this.state.numberOfStocks} Stock(s) @ ${this.props.data.lastSalePrice} for {this.props.data.symbol}?
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
              This stock has no available volume!
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
