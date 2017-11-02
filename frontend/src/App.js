import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Category from './components/Category';
import Root from './components/Root';
import Post from './components/Post';
import PostCE from './components/PostCE';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }
  
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Root />
        )}/>
        <Route exact path="/category" render={() =>(
          <Category />
        )}/>
        <Route exact path="/post" render={() => (
          <Post />
        )}/>
        <Route exact path="/postCreateEdit" render={() => (
          <PostCE />
        )} />
      </div>
    );
  }
}

export default withRouter(App)