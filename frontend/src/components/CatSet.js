import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPostCat, catsActionFetch } from '../actions/actions.js';
//import * as utils from '../utils';

class CatSet extends React.Component {  //({ cats, setPostCat, selectedCat }) {
  componentDidMount() {
    console.log(`CatSet.js.componentDidMount state: ${JSON.stringify(this.state)}`);
    console.log('about to run fetchCats in componentDidMount');
    this.props.fetchCats();
    console.log('ran fetchCats in componentDidMount');
    console.log(`CatSet.js.componentDidMount state: ${JSON.stringify(this.state)}`);
  }
  
  render () {
    const spanBold = { fontWeight:'bold' };
    const spanNormal = { fontWeight:'normal' };
    console.log('cats in CategorySet: ', this.props.cats);
    console.log('CategorySet typeof(this.props.cats): ', typeof(this.props.cats));

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
  console.log('CatSet.mapStateToProps.state.cats: ', state.cats);
  //const selectedCat = 'react';
  console.log('state.postCat: ', state.postCat);

  return { cats: state.cats, selectedCat: state.postCat };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchCats: () => dispatch(catsActionFetch()),
      setPostCat: (cat) => dispatch(setPostCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatSet)