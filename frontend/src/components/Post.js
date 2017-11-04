import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostView from '../components/PostView';

const Post = ({match}) => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Post Detail View" /></MuiThemeProvider>
    <div><MuiThemeProvider><CatViewLinks match={match} /></MuiThemeProvider></div>
    <div><MuiThemeProvider><PostView category={match.params.category} post_id={match.params.post_id}/></MuiThemeProvider></div>
  </div>
)

export default Post