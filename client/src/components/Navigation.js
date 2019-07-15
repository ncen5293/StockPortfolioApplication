import React, { Component } from 'react';
import { Responsive, Menu, Dropdown } from 'semantic-ui-react';
import Searchbar from './Searchbar';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';

class Navigation extends Component {
  render() {
    return (
      <Menu fluid widths={3} inverted color="teal">
        <Menu.Item>
          Stock Portfolio Application
        </Menu.Item>
        <Menu.Item>
          <Searchbar
            onKeyPress={this.props.onKeyPress}
            onChange={this.props.onSearchChange}
            value={this.props.searchInput}
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
