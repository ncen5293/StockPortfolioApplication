import React, { Component } from 'react';

class Searchbar extends Component {
  render() {
    return (
      <div className="icon ui input">
        <input
          type="text"
          onKeyPress={this.props.onKeyPress}
          onChange={this.props.onChange}
          value={this.props.value}
          placeholder="Search for a stock symbol..."
        />
        <i aria-hidden="true" className="search icon"></i>
      </div>
    );
  }
}

export default Searchbar;
