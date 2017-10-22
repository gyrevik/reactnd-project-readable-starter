import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setViewCat, catsFetch } from '../actions/actions.js';
import * as jsxStyles from '../jsxStyles';

class CatViewLinks extends React.Component {
  render () {
    return (
      <div>
        View Category:{' '}
        {this.props.cats.map ((cat, i) =>
          <span key={Math.random()}>
            <Link to="/category" key={i.toString()} onClick={() => this.props.setViewCat(cat.name)}
              style={this.props.selectedCat===cat.name ? jsxStyles.spanBold : jsxStyles.spanNormal}>
              {cat.name}
            </Link>
            <span>{ ' - '}</span>
          </span>
        )}
        <span>
          <Link to="/category" onClick={() => this.props.setViewCat('all')} 
            style={this.props.selectedCat==='all' ? jsxStyles.spanBold : jsxStyles.spanNormal}>
            all
          </Link>
        </span>
      </div>  
    )
  }
}

const mapStateToProps = (state, props) => { 
  return { cats: state.cats, selectedCat: state.viewCat };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      setViewCat: (cat) => dispatch(setViewCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatViewLinks)