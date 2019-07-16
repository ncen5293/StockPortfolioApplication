import React, { Component } from 'react';
import { Responsive, Menu, Dropdown } from 'semantic-ui-react';
import Searchbar from './Searchbar';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      searchInput: ''
    }
  }

  onSearchEnter = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.setState({searchInput: ''});
    }
  }

  onSearchChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  render() {
    return (
      <Menu fluid widths={3} inverted color="teal">
        <Menu.Item>
          <a href="/">Stock Portfolio Application</a>
        </Menu.Item>
        <Menu.Item>
          <Searchbar
            onKeyPress={this.onSearchEnter}
            onChange={this.onSearchChange}
            value={this.state.searchInput}
          />
        </Menu.Item>
        <Responsive {...Responsive.onlyMobile} as={Menu.Item}>
          <Menu.Menu>
            <Dropdown icon="large bars">
              <Dropdown.Menu direction="left">
                <Dropdown.Item>
                  <SignUpButton />
                </Dropdown.Item>
                <Dropdown.Item>
                  <LoginButton />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Responsive>
        <Responsive as={Menu.Item} minWidth={Responsive.onlyTablet.minWidth}>
          <SignUpButton />
          <LoginButton />
        </Responsive>
      </Menu>
    );
  }
}

export default Navigation;
