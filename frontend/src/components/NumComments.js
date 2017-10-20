import React from 'react';
import { connect } from 'react-redux';
import { commentsFetch } from '../actions/actions.js';

class NumComments extends React.Component {
  componentDidMount () {
    console.log('NumComments.componentDidMount().this.props.postId: ', this.props.postId);
    this.props.fetchComments(this.props.postId);
  }

  render () {
    console.log('this.props.postId in NumComments: ', this.props.postId);
    console.log('typeof(this.props.postId): ', typeof(this.props.postId));

    return (
      <span>
        { this.props.comments.reduce((a, c) => c.deleted === false && c.parentId === this.props.postId ? ++a : a, 0) }
      </span>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('NumComments state: ', state);
  
  //let numComments = state.comments.length;
  //console.log('numComments before reduce: ', numComments);
  //numComments = state.comments.reduce((a, c) => c.deleted === false ? ++a : a, 0);
  //console.log('numComments after reduce: ', numComments);
  //debugger;
  
  return { comments: state.comments };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: (postId) => dispatch(commentsFetch(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumComments)