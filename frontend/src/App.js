import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CatSet from './components/CatSet.js';
import CatViewLinks from './components/CatViewLinks.js';
import Header from './components/Header.js';
import PostList from './components/PostList.js';
import PostCreateEdit from './components/PostCreateEdit.js';
import PostView from './components/PostView.js';

import logo from './logo.svg';
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
          <div>
            <MuiThemeProvider><Header appIntro="Readable Home" /></MuiThemeProvider>
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
        )}/>
        <Route exact path="/category" render={() =>(
          <div>
            <MuiThemeProvider><Header appIntro="Readable Category View" /></MuiThemeProvider>
            <div>
            <MuiThemeProvider><CatViewLinks /></MuiThemeProvider>
            </div>
            <div>
              <br />
              <PostCreateEdit />
            </div>
            <div>
              <PostList />
            </div>
          </div>
        )}/>
        <Route exact path="/post" render={() => (
          <div>
            <MuiThemeProvider><Header appIntro="Readable Post Detail View" /></MuiThemeProvider>
            <div><PostView /></div>
          </div>
        )}/>
        <Route exact path="/postCreateEdit" render={() => (
          <div>
            <MuiThemeProvider><Header appIntro="Readable Post Create/Edit View" /></MuiThemeProvider>
            <PostCreateEdit />
          </div>
        )} />
      </div>
    );
  }
}

export default withRouter(App)