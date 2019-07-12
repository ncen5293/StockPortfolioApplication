import React, { Component } from 'react';
import Searchbar from './Searchbar';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';

class Navigation extends Component {
  render() {
    return (
      <div className="ui fluid three item inverted menu">
        <div className="item">
          <Searchbar />
        </div>
        <div className="item">
          Stock Portfolio Game
        </div>
        <div className="item">
          <SignUpButton />
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default Navigation;
