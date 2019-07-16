import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <BrowserRouter>
          <Route exact path = "/" component = {Home} exact />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
