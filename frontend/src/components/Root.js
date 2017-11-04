import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostCEContainer from '../components/PostCEContainer';
import PostList from '../components/PostList';

const Root = ({match}) => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Home" /></MuiThemeProvider>
    <div><MuiThemeProvider><CatViewLinks match={match} /></MuiThemeProvider></div>
    <div>
      <br />
      <MuiThemeProvider><PostCEContainer edit={false} match={match} /></MuiThemeProvider>
    </div>
    <div>
      <PostList />
    </div>
  </div>
);

export default Root