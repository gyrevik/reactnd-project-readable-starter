import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostCEContainer from '../components/PostCEContainer';

const Root = ({match}) => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Post Edit View" /></MuiThemeProvider>
    <div><MuiThemeProvider><CatViewLinks match={match} /></MuiThemeProvider></div>
    <div>
      <br />
      <MuiThemeProvider><PostCEContainer edit={true} match={match} /></MuiThemeProvider>
    </div>
  </div>
);

export default Root