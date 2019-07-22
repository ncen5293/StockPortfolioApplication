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

  getCurrentStockPrice = (stock, i) => {
    axios({
      method: 'GET',
      url: `https://api.iextrading.com/1.0/tops/last?symbols=${stock.symbol}`
    })
      .then (res => {
        let buyDate = new Date(stock.buyDate);
        buyDate = buyDate.toUTCString();
        let stockInfo = ( <Table.Body key={i} >
                            <Table.Row>
                              <Table.Cell singleLine>
                                {stock.symbol}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                ${stock.price.toFixed(2)}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                {stock.volume}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                ${(stock.volume * stock.price).toFixed(2)}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                {buyDate}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                ${res.data[0].price.toFixed(2)}
                              </Table.Cell>
                              <Table.Cell singleLine>
                                <SellButton stockInfo={stock} />
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>);
        this.setState((state) => {
          const stockRows = state.stockRows.concat(stockInfo);
          return { stockRows };
        });
      })
  }

  componentDidMount = () => {
    for (let i=0; i<this.props.stockData.length; i++) {
      this.getCurrentStockPrice(this.props.stockData[i], i);
    }
  }

  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
            <Table.HeaderCell singleLine>{`${this.props.type} Price`}</Table.HeaderCell>
            <Table.HeaderCell singleLine>Volume</Table.HeaderCell>
            <Table.HeaderCell singleLine>Total</Table.HeaderCell>
            <Table.HeaderCell singleLine>{`${this.props.type} Date`}</Table.HeaderCell>
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
