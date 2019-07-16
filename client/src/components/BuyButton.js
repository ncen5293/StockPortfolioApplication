import React, { Component } from 'react';
import { Button, Modal, Form, Header, Icon } from 'semantic-ui-react';

class BuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuyOpen: false,
      isWarningOpen: false
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

  }

  render() {
    return (
      <div>
        <Button compact size="mini" onClick={this.toggleBuyModal} icon='shopping cart' labelPosition='left' content="Buy Stocks"/>
        <Modal size="tiny" open={this.state.isBuyOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeBuyModal} >
          <Modal.Header>Buy this Stock</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.buyStocks} >
              <Form.Field>
                <label>Stock Amount</label>
                <input defaultValue="" name="amount" placeholder='0' />
              </Form.Field>
              <Button primary type='submit'>Buy</Button>
            </Form>
          </Modal.Content>
        </Modal>

        <Modal basic size='mini' open={this.state.isWarningOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.closeWarningModal} >
          <Header icon='ban' content='Unable to buy this stock' />
          <Modal.Content>
            <p>
              This stock has no available shares!
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
