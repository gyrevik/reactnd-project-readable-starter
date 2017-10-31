import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { setViewCat, catsFetch } from '../actions/actions';
import { cats } from '../reducers/cats';
import { viewCat } from '../reducers/viewCat';
import * as jsxStyles from '../jsxStyles';

class CatViewLinks extends React.Component {
  render () {
    const { setViewCat, viewCat, cats } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              {cats.map ((cat, i) =>
                <RaisedButton 
                  key={Math.random()}
                  label={cat.name} 
                  primary={viewCat===cat.name ? true : false} 
                  onClick={() => setViewCat(cat.name)} 
                  containerElement={<Link to="/category" key={i.toString()} />}
                />
              )}
              <RaisedButton label="all" primary={viewCat==='all' ? true : false} onClick={() => setViewCat('all')} 
                containerElement={<Link to="/category" />} />
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

export default connect(mapStateToProps, { setViewCat, catsFetch })(CatViewLinks)