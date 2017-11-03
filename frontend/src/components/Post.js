import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import PostView from '../components/PostView';

const Post = ({match}) => (
  <div>
    <div>
    {console.log('match.params.category: ', match.params.category)}
    {console.log('match.params.post_id: ', match.params.post_id)}
    </div>
    <MuiThemeProvider><Header appIntro="Readable Post Detail View" /></MuiThemeProvider>
    <div><MuiThemeProvider><PostView category={match.params.category} post_id={match.params.post_id}/></MuiThemeProvider></div>
  </div>
)

export default Post