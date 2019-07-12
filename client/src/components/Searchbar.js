import React, { Component } from 'react';

class Searchbar extends Component {
  render() {
    return (
      <div className="icon ui input">
        <input type="text" list="stocks" placeholder="Choose language..." />
        <datalist id="stocks">
          <option value="English"></option>
          <option value="Chinese"></option>
          <option value="Dutch"></option>
        </datalist>
        <i aria-hidden="true" className="search icon"></i>
      </div>
    );
  }
}

export default Searchbar;
