import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import { setViewCat } from '../actions/actions';

class CatViewLinks extends React.Component {
  render () {
    const { setViewCat, viewCat, cats } = this.props;
    const path = createHistory().location.pathname;
    console.log('path: ', path)
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              {cats.map ((cat, i) =>
                <RaisedButton 
                  key={Math.random()}
                  label={cat.name} 
                  primary={viewCat===cat.name && path !== '/' ? true : false} 
                  onClick={() => setViewCat(cat.name)} 
                  containerElement={<Link to={`/${cat.path}`} key={i.toString()} />}
                />
              )}
              <RaisedButton label="all" primary={viewCat==='all' && path === '/all' ? true : false} onClick={() => setViewCat('all')} 
                containerElement={<Link to="/all" />} />
              <RaisedButton label="home" primary={path === '/' ? true : false} onClick={() => setViewCat('home')} 
                containerElement={<Link to="/" />} />
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
      </div>  
    )
  }
}

const mapStateToProps = ({ cats, viewCat }) => {
  return { cats, viewCat };
}

export default connect(mapStateToProps, { setViewCat })(CatViewLinks)