import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { setViewCat, catsFetch } from '../actions/actions';
import { cats } from '../reducers/cats';
import { viewCat } from '../reducers/viewCat';
import * as jsxStyles from '../jsxStyles';

class CatViewLinks extends React.Component {
  render () {
    const { setViewCat, viewCat, cats } = this.props;
    return (
      <div>
        View Category:{' '}
        <RaisedButton label="View Category:" disableTouchRipple={true} />
        {cats.map ((cat, i) =>
          <span key={Math.random()}>
            <RaisedButton label={cat.name} primary={viewCat===cat.name ? true : false} 
              onClick={() => setViewCat(cat.name)}
              containerElement={
              <Link to="/category" key={i.toString()} />
            }/>
          </span>
        )}
        <span>
          <Link to="/category" onClick={() => setViewCat('all')} 
            style={viewCat==='all' ? jsxStyles.spanBold : jsxStyles.spanNormal}>
            all
          </Link>
        </span>
      </div>  
    )
  }
}

const mapStateToProps = ({ cats, viewCat }) => {
  return { cats, viewCat };
}

export default connect(mapStateToProps, { setViewCat, catsFetch })(CatViewLinks)