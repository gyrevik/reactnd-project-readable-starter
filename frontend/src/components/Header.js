import React from 'react';
import logo from '../logo.svg';
import AppBar from 'material-ui/AppBar';

/*const Header = ({ appIntro }) => (
  <div>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Readable</h2>
    </div>
    <p className="App-intro">
      { appIntro }
    </p>
  </div>
);*/

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = ({ appIntro }) => (
  <AppBar
    title={ appIntro }
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    showMenuIconButton={ false }
  />
);

export default Header;