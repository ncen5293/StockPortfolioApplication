import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';

class StockInformation extends Component {
  render() {
    let stockData = this.props.data;
    if (stockData.lastSaleTime > 0) {
      let lastSaleTime = new Date(stockData.lastSaleTime);
      stockData.lastSaleTime = lastSaleTime.toUTCString();
    } else {
      stockData.lastSaleTime = 'N/A'
    }
    stockData.marketPercent = stockData.marketPercent * 100;
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Market %</Table.HeaderCell>
            <Table.HeaderCell singleLine>Shares</Table.HeaderCell>
            <Table.HeaderCell singleLine>Last Sale Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Last Sale Volume</Table.HeaderCell>
            <Table.HeaderCell singleLine>Last Sale Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell singleLine>
              {stockData.marketPercent}%
            </Table.Cell>
            <Table.Cell singleLine>
              {stockData.volume}
            </Table.Cell>
            <Table.Cell singleLine>
              ${stockData.lastSalePrice}
            </Table.Cell>
            <Table.Cell singleLine>
              {stockData.lastSaleSize}
            </Table.Cell>
            <Table.Cell singleLine>
              {stockData.lastSaleTime}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default StockInformation;
