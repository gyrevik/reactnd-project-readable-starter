import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import CatViewLinks from '../components/CatViewLinks';
import PostCEContainer from '../components/PostCEContainer';

class Root extends React.Component {
  //edit = () => {
  //  return this.props.match.path === '/:category/edit/:post_id';
  //}

  render () {
    return (
      <div>
        <MuiThemeProvider><Header appIntro="Readable Post Edit View" /></MuiThemeProvider>
        <div><MuiThemeProvider><CatViewLinks /></MuiThemeProvider></div>
        <div>
          <br />
          <MuiThemeProvider><PostCEContainer edit={true} match={this.props.match} /></MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Root