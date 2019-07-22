import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class SearchInformation extends Component {
  render() {
    let stockData = this.props.data;
    if (stockData.time > 0) {
      let lastSaleTime = new Date(stockData.time);
      stockData.time = lastSaleTime.toUTCString();
    } else {
      stockData.time = 'N/A'
    }
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Current Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Price Update Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell singleLine>
              ${stockData.price.toFixed(2)}
            </Table.Cell>
            <Table.Cell singleLine>
              {stockData.time}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default SearchInformation;
