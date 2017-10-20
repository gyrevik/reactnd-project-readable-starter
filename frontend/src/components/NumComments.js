import React from 'react';
import { connect } from 'react-redux';
import { commentsFetch } from '../actions/actions.js';

class NumComments extends React.Component {
  componentDidMount () {
    this.props.fetchComments(this.props.postId);
  }

  render () {
    return (
      <span>
        { this.props.comments.reduce((a, c) => c.deleted === false && c.parentId === this.props.postId ? ++a : a, 0) }
      </span>
    )
  }
}

const mapStateToProps = (state, props) => {  
  return { comments: state.comments };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: (postId) => dispatch(commentsFetch(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumComments)