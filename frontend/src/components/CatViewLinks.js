import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        {cats.map ((cat, i) =>
          <span key={Math.random()}>
            <Link to="/category" key={i.toString()} onClick={() => setViewCat(cat.name)}
              style={viewCat===cat.name ? jsxStyles.spanBold : jsxStyles.spanNormal}>
              {cat.name}
            </Link>
            <span>{ ' - '}</span>
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
  //console.log('viewCat in mapStateToProps: ', viewCat)
  return { cats, viewCat };
  //return { cats: state.cats, selectedCat: state.viewCat };
}
  
/*const mapDispatchToProps = (dispatch) => {
    return {
      setViewCat: (cat) => dispatch(setViewCat(cat))
  };
}*/

export default connect(mapStateToProps, { setViewCat, catsFetch })(CatViewLinks)