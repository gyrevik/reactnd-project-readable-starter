import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
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
            
              <RaisedButton key={i.toString()} label={cat.name} primary={this.props.postCat===cat.name ? true : false}
                onClick={() => this.props.setPostCat(cat.name)}
                
              />
            
        )}
      </span>
    )
  }
}

const mapStateToProps = ({ cats, postCat }) => { 
  return { cats, postCat };
}

export default connect(mapStateToProps, {catsFetch, setPostCat})(CatSet)