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
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }
  
  render() {
    const {cats} = this.props;
    console.log('cats: ', cats)

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Root}/>
          <Route exact path="/:path" component={Category} />
          <Route exact path="/post" component={Post}/>
          <Route exact path="/postCreateEdit" component={PostCE} />
        </Switch>
      </div>
    );
  }
}

//export default withRouter(App)

const mapStateToProps = ({ cats }) => {
  return { cats };
}

export default connect(mapStateToProps)(App)