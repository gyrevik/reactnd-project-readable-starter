import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPostCat, catsFetch } from '../actions/actions';
import cats from '../reducers/cats';
import postCat from '../reducers/postCat';
import * as jsxStyles from '../jsxStyles';

class CatSet extends React.Component {
  componentDidMount() {
    this.props.catsFetch();
  }
  
  render () {
    return (
      <span>Post Category:&nbsp;
      {this.props.cats.map (
          (cat, i) =>
            <span key={i.toString()} style={this.props.postCat===cat.name ? jsxStyles.spanBold : jsxStyles.spanNormal}>
              <a href="javascript:void(0)" onClick={() => this.props.setPostCat(cat.name)}>{cat.name}</a>
              <span style={jsxStyles.spanNormal}>{ i < this.props.cats.length-1 ? ' - ' : '' }</span>
            </span>
        )}
      </span>
    )
  }
}

const mapStateToProps = ({ cats, postCat }) => { 
  return { cats, postCat };
}

export default connect(mapStateToProps, {catsFetch, setPostCat})(CatSet)