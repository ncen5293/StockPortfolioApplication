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
        let date = new Date(stock.date);
        date = date.toUTCString();
        let stockInfo;
        let active = false;
        let negative = false;
        let positive = false;
        if (stock.price.toFixed(2) > res.data[0].price.toFixed(2)) {
          negative = true;
        } else if (stock.price.toFixed(2) < res.data[0].price.toFixed(2)) {
          positive = true;
        } else {
          active = true;
        }
        if (this.props.type === 'Buy') {
          stockInfo = ( <Table.Body key={i} >
                              <Table.Row active={active} negative={negative} positive={positive} >
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
                                  {date}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  ${res.data[0].price.toFixed(2)}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  <SellButton stockInfo={stock} sellPrice={res.data[0].price.toFixed(2)} />
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>);
        } else if (this.props.type === 'Sell') {
          stockInfo = ( <Table.Body key={i} >
                              <Table.Row active={active} negative={positive} positive={negative} >
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
                                  {date}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  ${res.data[0].price.toFixed(2)}
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>);
        } else if (this.props.type === 'All' && stock.reason === 'Buy') {
          stockInfo = ( <Table.Body key={i} >
                              <Table.Row active={active} negative={negative} positive={positive} >
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
                                  {date}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  ${res.data[0].price.toFixed(2)}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  {stock.reason}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  <SellButton stockInfo={stock} sellPrice={res.data[0].price.toFixed(2)} />
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>);
        } else if (this.props.type === 'All' && stock.reason === 'Sell') {
          stockInfo = ( <Table.Body key={i} >
                              <Table.Row active={active} negative={positive} positive={negative} >
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
                                  {date}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  ${res.data[0].price.toFixed(2)}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  {stock.reason}
                                </Table.Cell>
                                <Table.Cell singleLine/>
                              </Table.Row>
                            </Table.Body>);
        }
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
    if (this.props.type === 'Buy') {
      return (
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
              <Table.HeaderCell singleLine>Buy Price</Table.HeaderCell>
              <Table.HeaderCell singleLine>Volume</Table.HeaderCell>
              <Table.HeaderCell singleLine>Total</Table.HeaderCell>
              <Table.HeaderCell singleLine>{`${this.props.type} Date`}</Table.HeaderCell>
              <Table.HeaderCell singleLine>Current Price</Table.HeaderCell>
              <Table.HeaderCell singleLine />
            </Table.Row>
          </Table.Header>
          {this.state.stockRows}
        </Table>
      );
    } else if (this.props.type === 'Sell') {
      return (
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
              <Table.HeaderCell singleLine>Sell Price</Table.HeaderCell>
              <Table.HeaderCell singleLine>Volume</Table.HeaderCell>
              <Table.HeaderCell singleLine>Total</Table.HeaderCell>
              <Table.HeaderCell singleLine>{`${this.props.type} Date`}</Table.HeaderCell>
              <Table.HeaderCell singleLine>Current Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.state.stockRows}
        </Table>
      );
    } else {
      return (
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
              <Table.HeaderCell singleLine>Transaction Price</Table.HeaderCell>
              <Table.HeaderCell singleLine>Volume</Table.HeaderCell>
              <Table.HeaderCell singleLine>Total</Table.HeaderCell>
              <Table.HeaderCell singleLine>Transaction Date</Table.HeaderCell>
              <Table.HeaderCell singleLine>Current Price</Table.HeaderCell>
              <Table.HeaderCell singleLine>Transaction Type</Table.HeaderCell>
              <Table.HeaderCell singleLine />
            </Table.Row>
          </Table.Header>
          {this.state.stockRows}
        </Table>
      );
    }

  }
}

export default PortfolioInformation;
