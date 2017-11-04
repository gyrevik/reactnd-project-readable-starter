import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostCEContainer from '../components/PostCEContainer';
import PostList from '../components/PostList';

class Category extends React.Component {
  render () {
    return (
      <div>
        <MuiThemeProvider><Header appIntro="Readable Category View" /></MuiThemeProvider>
        <div><MuiThemeProvider><CatViewLinks /></MuiThemeProvider></div>
        <div>
          <br />
          <MuiThemeProvider><PostCEContainer /></MuiThemeProvider>
        </div>
        <div>
          <PostList />
        </div>
      </div>
    )
  }
}

export default Category