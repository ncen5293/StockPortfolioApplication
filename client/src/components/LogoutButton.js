import React, { Component } from 'react';
import { Button  } from 'semantic-ui-react';

class LogoutButton extends Component {
  logoutAccount = () => {
    localStorage.setItem('isLoggedIn', false);
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Button onClick={this.logoutAccount} icon='log out' labelPosition='left' content="Log-out"/>
      </div>
    );
  }
}

export default LogoutButton;
