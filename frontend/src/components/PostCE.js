import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import PostCreateEdit from '../components/PostCreateEdit';

const PostCE = () => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Post Create/Edit View" /></MuiThemeProvider>
    <MuiThemeProvider><PostCreateEdit /></MuiThemeProvider>
  </div>
);

export default PostCE