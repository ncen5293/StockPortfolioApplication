import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import SellButton from './SellButton';

class PortfolioInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockRows: [],
      currentStockPrices: []
    }
  }

  getCurrentStockPrice = (symbol) => {
    let currentPrice = 'N/A';
    axios({
      method: 'GET',
      url: `https://api.iextrading.com/1.0/deep?symbols=${symbol}`
    })
      .then (res => {
        this.setState((state) => {
          const currentStockPrices = state.currentStockPrices.concat(res.data.lastSalePrice);
          console.log(currentStockPrices)
          return { currentStockPrices };
        });
      })
  }

  componentDidMount = () => {
    const stockRows = this.props.stockData.map((stock, i) => {
      let buyDate = new Date(stock.buyDate);
      buyDate = buyDate.toUTCString();
      this.getCurrentStockPrice(stock.symbol);
      return (<Table.Body key={i}>
                <Table.Row>
                  <Table.Cell singleLine>
                    {stock.symbol}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    ${stock.buyPrice.toFixed(2)}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {stock.volume}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    ${(stock.volume * stock.buyPrice).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {buyDate}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {this.state.currentStockPrices[i]}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>);
    });
    this.setState({ stockRows });
  }

  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
            <Table.HeaderCell singleLine>Buy Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Volume</Table.HeaderCell>
            <Table.HeaderCell singleLine>Total Buy Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Buy Date</Table.HeaderCell>
            <Table.HeaderCell singleLine>Today's Open Price</Table.HeaderCell>
            <Table.HeaderCell singleLine />
          </Table.Row>
        </Table.Header>
        {this.state.stockRows}
      </Table>
    );
  }
}

export default PortfolioInformation;
