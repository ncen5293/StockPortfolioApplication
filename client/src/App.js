import React, { Component } from 'react';
// import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
