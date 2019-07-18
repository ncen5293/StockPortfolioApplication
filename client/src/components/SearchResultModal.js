import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import BuyButton from './BuyButton';
import SearchInformation from './SearchInformation';

class SearchResultModal extends Component {
  render() {
    return (
      <div>
        <Modal open={this.props.isSearchOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.props.closeSearchModal} >
          <Modal.Header>{this.props.stockData.symbol} Stock Information</Modal.Header>
          <Modal.Content>
            <SearchInformation
              data={this.props.stockData}
            />
            <BuyButton
              data={this.props.stockData}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SearchResultModal;
