import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Category from './components/Category';
import Root from './components/Root';
import Post from './components/Post';
import PostCETopLevel from './components/PostCETopLevel';
import NotFound from './components/NotFound';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/NotFound" component={NotFound} />
          <Route exact path="/:category" component={Category} />
          <Route exact path="/:category/:post_id" component={Post} />
          <Route exact path="/:category/edit/:post_id" component={PostCETopLevel} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)