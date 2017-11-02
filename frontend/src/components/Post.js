import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import PostView from '../components/PostView';

const Post = () => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Post Detail View" /></MuiThemeProvider>
    <div><MuiThemeProvider><PostView /></MuiThemeProvider></div>
  </div>
)

export default Post