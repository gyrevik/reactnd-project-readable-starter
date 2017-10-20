import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setViewCat, catsFetch } from '../actions/actions.js';

class CatViewLinks extends React.Component {
  render () {
    const spanBold = { fontWeight:'bold' };
    const spanNormal = { fontWeight:'normal' };
    //console.log('cats in CatViewLinks: ', this.props.cats);
    //console.log('CatViewLinks typeof(this.props.cats): ', typeof(this.props.cats));

    return (
      <div>
        View Category:{' '}
          {this.props.cats.map ((cat, i) =>
            <span key={Math.random()} style={this.props.selectedCat===cat.name ? spanBold : spanNormal}>
              <Link to="/category" key={i.toString()} onClick={() => this.props.setViewCat(cat.name)}>
              {cat.name}
            </Link>
          <span>{ i < this.props.cats.length-1 ? ' - ' : '' }</span>
        </span>
        )}
      </div>  
    )
  }
}

const mapStateToProps = (state, props) => { 
  //console.log('CatViewLinks.mapStateToProps.state.cats: ', state.cats);
  //console.log('state.viewCat: ', state.viewCat);

  return { cats: state.cats, selectedCat: state.viewCat };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      setViewCat: (cat) => dispatch(setViewCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatViewLinks)