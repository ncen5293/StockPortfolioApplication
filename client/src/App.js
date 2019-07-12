import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Navigation from './components/Navigation';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default App;
