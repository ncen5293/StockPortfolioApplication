import React, { Component } from 'react';
import { Button  } from 'semantic-ui-react';

class LogoutButton extends Component {
  logoutAccount = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    window.location.reload();
  }

  render() {
    if (this.props.isFluid) {
      return (
        <div>
          <Button fluid onClick={this.logoutAccount} icon='log out' labelPosition='left' content="Log-out"/>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={this.logoutAccount} icon='log out' labelPosition='left' content="Log-out"/>
        </div>
      );
    }
  }
}

export default LogoutButton;
