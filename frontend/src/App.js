import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CatViewLinks from './components/CatViewLinks.js';
import Header from './components/Header.js';
import PostList from './components/PostList.js';
import PostCreateEdit from './components/PostCreateEdit.js';
import PostView from './components/PostView.js';
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
              <MuiThemeProvider><PostCreateEdit /></MuiThemeProvider>
            </div>
            <div>
              <PostList />
            </div>
          </div>
        )}/>
        <Route exact path="/post" render={() => (
          <div>
            <MuiThemeProvider><Header appIntro="Readable Post Detail View" /></MuiThemeProvider>
            <div><MuiThemeProvider><PostView /></MuiThemeProvider></div>
          </div>
        )}/>
        <Route exact path="/postCreateEdit" render={() => (
          <div>
            <MuiThemeProvider><Header appIntro="Readable Post Create/Edit View" /></MuiThemeProvider>
            <MuiThemeProvider><PostCreateEdit /></MuiThemeProvider>
          </div>
        )} />
      </div>
    );
  }
}

export default withRouter(App)