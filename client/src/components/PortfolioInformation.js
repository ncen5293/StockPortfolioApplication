import React, { Component } from 'react';
import axios from 'axios';
import { Table, Segment, Statistic } from 'semantic-ui-react';
import SellButton from './SellButton';

class PortfolioInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockRows: [],
      buyStat: 0,
      sellStat: 0,
      buyAmount: 0,
      sellAmount: 0
    }
  }

  async getCurrentStockPrice (stock, i) {
    await axios({
      method: 'GET',
      url: `https://api.iextrading.com/1.0/tops/last?symbols=${stock.symbol}`
    })
      .then (res => {
        console.log(i);
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
        if (stock.reason === 'Buy') {
          this.setState((state) => {
            const buyStat = state.buyStat + (stock.volume * stock.price);
            const buyAmount = state.buyAmount+1;
            return { buyStat, buyAmount };
          });
        } else {
          this.setState((state) => {
            const sellStat = state.sellStat + (stock.volume * stock.price);
            const sellAmount = state.sellAmount+1;
            return { sellStat, sellAmount };
          });
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
                              </Table.Row>
                            </Table.Body>);
        }
        this.setState((state) => {
          const stockRows = state.stockRows.concat(stockInfo);
          return { stockRows };
        });
      })
  }

  componentDidMount = async () => {
    for (let i=0; i<this.props.stockData.length; i++) {
      await this.getCurrentStockPrice(this.props.stockData[i], i);
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
      const sellStat = this.state.sellStat;
      const buyStat = this.state.buyStat;
      const sellAmount = this.state.sellAmount;
      const buyAmount = this.state.buyAmount;
      let netGain = '';
      if (sellStat - buyStat >= 0) {
        netGain = '+$' + ((sellStat - buyStat).toFixed(2));
      } else {
        netGain = '-$' + (Math.abs((sellStat - buyStat).toFixed(2)));
      }
      return (
        <div>
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
              </Table.Row>
            </Table.Header>
            {this.state.stockRows}
          </Table>
          <Segment inverted>
            <Statistic inverted color='red' >
              <Statistic.Value>-${buyStat.toFixed(2)}</Statistic.Value>
              <Statistic.Label>Total Amount Spent on {buyAmount} Transactions</Statistic.Label>
            </Statistic>
            <Statistic inverted color='green' >
              <Statistic.Value>+${sellStat.toFixed(2)}</Statistic.Value>
              <Statistic.Label>Total Amount Gained on {sellAmount} Transactions</Statistic.Label>
            </Statistic>
            <Statistic inverted >
              <Statistic.Value>{netGain}</Statistic.Value>
              <Statistic.Label>Net Gain</Statistic.Label>
            </Statistic>
          </Segment>
        </div>
      );
    }

  }
}

export default PortfolioInformation;
