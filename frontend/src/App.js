import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
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
        <Route exact path="/" component={Root}/>
        <Route exact path="/category" component={Category}/>
        <Route exact path="/post" component={Post}/>
        <Route exact path="/postCreateEdit" component={PostCE} />
      </div>
    );
  }
}

export default withRouter(App)