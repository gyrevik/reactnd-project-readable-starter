import React from 'react';
import { connect } from 'react-redux';
import { commentsFetch } from '../actions/actions.js';

class NumComments extends React.Component {
  componentDidMount () {
    this.props.commentsFetch(this.props.postId);
  }

  render () {
    const { comments, postId } = this.props;
    return (
      <span>
        { comments.reduce((a, comment) => comment.deleted === false && comment.parentId === postId ? ++a : a, 0) }
      </span>
    )
  }
}

const mapStateToProps = ({ comments }) => {  
  return { comments };
}

export default connect(mapStateToProps, { commentsFetch })(NumComments)