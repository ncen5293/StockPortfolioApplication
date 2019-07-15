import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import LoginButton from './LoginButton';
import BuyBidButton from './BuyBidButton';
import BuyAskButton from './BuyAskButton';

class StockTable extends Component {
  render() {
    console.log(this.props.stockData);
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '80vh',
        width: '100%' }}
      >
        <AgGridReact
          columnDefs={[{
                  headerName: "Stock Symbol", field: "symbol"
                }, {
                  headerName: "Market %", field: "marketPercent"
                }, {
                  headerName: "Shares", field: "volume"
                }, {
                  headerName: "Bid", valueGetter: (params) => params.data.bidSize + ' x ' + params.data.bidPrice
                }, {
                  headerName: "Ask", valueGetter: (params) => params.data.askSize + ' x ' + params.data.askPrice
                }, {
                  headerName: "Last Sale", valueGetter: (params) => params.data.lastSaleSize + ' x ' + params.data.lastSalePrice
                }, {
                  headerName: "Last Sale Date",  valueGetter: (params) => {
                    if (params.data.lastSaleTime > 0) {
                      let lastSaleTime = new Date(params.data.lastSaleTime);
                      return lastSaleTime.toUTCString();
                    } else {
                      return 'N/A'
                    }
                  }
                }, {
                  headerName: 'Buy Bid Price', cellRenderer: "bidButton"
                }, {
                  headerName: 'Buy Asking Price', cellRenderer: "bidButton"
                }]}
          rowData={this.props.stockData}
          pagination={true}
          paginationAutoPageSize={true}
          frameworkComponents={{
            bidButton: BuyBidButton,
            askButton: BuyAskButton
          }}
        >
        </AgGridReact>
      </div>
    );
  }
}

export default StockTable;
