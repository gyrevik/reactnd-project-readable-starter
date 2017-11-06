import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import HomeLink from '../components/HomeLink';

function NotFound({match}) {
  return (
    <div>
      <MuiThemeProvider><Header appIntro="Page Not Found" /></MuiThemeProvider>
      <div><MuiThemeProvider><HomeLink match={match} /></MuiThemeProvider></div>
    </div>
  )
}

export default NotFound;