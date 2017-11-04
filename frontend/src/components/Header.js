import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = ({ appIntro }) => (
  <MuiThemeProvider>
    <AppBar
      title={ appIntro }
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      showMenuIconButton={ false }
    />
  </MuiThemeProvider>
);

export default Header;