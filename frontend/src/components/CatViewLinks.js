import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from "react-router-dom";

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import { setViewCat, catsFetch } from '../actions/actions';

class CatViewLinks extends React.Component {
  componentDidMount() {
    this.props.catsFetch();
  }

  componentDidUpdate() {
    console.log('this.props.cats: ', this.props.cats)
    console.log('this.props.match: ', this.props.match)
    console.log('this.props.match.params.category: ', this.props.match.params.category)

    if (this.props.match.path === '/')
      return;

    let found = false;
    for (let cat of this.props.cats) {
      console.log('cat.path: ', cat.path)
      if (this.props.match.params.category === cat.path) {
        found = true;
        return;
      }
    }

    !found && this.props.history.push('/NotFound');
  }

  render () {
    const { setViewCat, viewCat, cats } = this.props;
    const path = createHistory().location.pathname;
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              {cats.map ((cat, i) =>
                <RaisedButton 
                  key={Math.random()}
                  label={cat.name} 
                  primary={this.props.match.params.category===cat.name && path !== '/' ? true : false} 
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
  console.log('cats: ', cats)
  //console.log('this.props.match: ', this.props.match)
  return { cats, viewCat };
}

export default withRouter(connect(mapStateToProps, { setViewCat, catsFetch })(CatViewLinks))