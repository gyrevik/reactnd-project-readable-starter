import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import { setViewCat } from '../actions/actions';

class HomeLink extends React.Component {
  render () {
    const { setViewCat } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <RaisedButton label="home" onClick={() => setViewCat('home')} 
                containerElement={<Link to="/" />} />
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
      </div>  
    )
  }
}

const mapStateToProps = () => { return {}; }

export default connect(mapStateToProps, { setViewCat })(HomeLink)