import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostCreateEdit from '../components/PostCreateEdit';
import PostList from '../components/PostList';

const Category = () => (
  <div>
    <MuiThemeProvider><Header appIntro="Readable Category View" /></MuiThemeProvider>
    <div>
      <MuiThemeProvider><CatViewLinks /></MuiThemeProvider>
    </div>
    <div>
      <br />
      <MuiThemeProvider><PostCreateEdit /></MuiThemeProvider>
    </div>
    <div>
      <PostList />
    </div>
  </div>
);

export default Category