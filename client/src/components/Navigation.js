import React, { Component } from 'react';
import { Responsive, Menu, Dropdown } from 'semantic-ui-react';
import Searchbar from './Searchbar';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';
import SearchResultModal from './SearchResultModal';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      searchInput: '',
      isSearchOpen: false
    }
  }

  onSearchEnter = (event) => {
    if (event.key === 'Enter') {
      localStorage.setItem('searchValue', this.state.searchInput);
      this.setState({searchInput: '', isSearchOpen: true});
    }
  }

  onSearchChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  goHome = () => {
    window.location.replace('/');
  }

  closeSearchModal = () => {
    this.setState({isSearchOpen: false});
  }

  render() {
    return (
      <div>
        <Menu fluid widths={3} inverted color="teal">
          <Menu.Item>
            <Menu.Header className="navLogo" onClick={this.goHome} >Stock Portfolio Application</Menu.Header>
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
        <SearchResultModal
          isSearchOpen={this.state.isSearchOpen}
          closeSearchModal={this.closeSearchModal}
        />
      </div>
    );
  }
}

export default Navigation;
