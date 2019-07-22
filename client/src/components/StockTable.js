import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import BuyButton from './BuyButton';

class StockTable extends Component {

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  }

  render() {
    console.log(this.props.stockData);
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '80vh',
        width: '100%' }}
      >
        <h1>{this.props.tableName}</h1>
        <AgGridReact
          columnDefs={[{
                  headerName: "Stock Symbol", field: "symbol"
                }, {
                  headerName: "Current Price Per Stock", valueGetter: (params) => '$' + params.data.price.toFixed(2)
                }, {
                  headerName: "Price Update Date",  valueGetter: (params) => {
                    if (params.data.time > 0) {
                      let lastSaleTime = new Date(params.data.time);
                      return lastSaleTime.toUTCString();
                    } else {
                      return 'N/A'
                    }
                  }
                }, {
                  headerName: '', cellRenderer: "buyButton"
                }]}
          rowData={this.props.stockData}
          pagination={true}
          paginationAutoPageSize={true}
          frameworkComponents={{
            buyButton: BuyButton
          }}
          rowHeight={33}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
        />
      </div>
    );
  }
}

export default StockTable;
