import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Category from './components/Category';
import Root from './components/Root';
import Post from './components/Post';
import PostCE from './components/PostCE';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Root}/>
          <Route exact path="/:category" component={Category} />
          <Route exact path="/:category/:post_id" component={Post}/>
          <Route exact path="/postCreateEdit" component={PostCE} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)