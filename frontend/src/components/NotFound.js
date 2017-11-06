import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';

function NotFound(props) {
  return (
    <div>
      <MuiThemeProvider><Header appIntro="Page Not Found" /></MuiThemeProvider>
    </div>
  )
}

export default NotFound;