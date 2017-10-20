import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPostCat, catsFetch } from '../actions/actions.js';

class CatSet extends React.Component {
  componentDidMount() {
    this.props.fetchCats();
  }
  
  render () {
    const spanBold = { fontWeight:'bold' };
    const spanNormal = { fontWeight:'normal' };

    return (
      <span>Post Category:&nbsp;
      {this.props.cats.map (
          (cat, i) =>
            <span key={i.toString()} style={this.props.selectedCat===cat.name ? spanBold : spanNormal}>
              <a href="javascript:void(0)" onClick={() => this.props.setPostCat(cat.name)}>{cat.name}</a>
              <span style={spanNormal}>{ i < this.props.cats.length-1 ? ' - ' : '' }</span>
            </span>
        )}
      </span>
    )
  }
}

const mapStateToProps = (state, props) => { 
  return { cats: state.cats, selectedCat: state.postCat };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchCats: () => dispatch(catsFetch()),
      setPostCat: (cat) => dispatch(setPostCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatSet)