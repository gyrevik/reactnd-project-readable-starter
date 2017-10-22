import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { setMode, voteCommentFetch, commentsFetch, createCommentFetch, createCommentErrored, editCommentFetch, 
  deletePostFetch, deleteCommentFetch } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import NumComments from '../components/NumComments.js';
import * as utils from '../utils';
import * as jsxStyles from '../jsxStyles';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleComment = this.handleComment.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.state = { openModal: false, edit: false };
  }

  handleModalOpen() {
    this.props.createCommentError(false);
    this.setState({ openModal: true })
  }

  handleModalSubmit() {
    if (!this.props.commentError) {
      this.setState({ openModal: false })
    }
  }

  handleComment() {
    const commentObj = {
      body: this.body.value, 
      id: this.state.edit ? this.state.comment.id : Math.random().toString(),
      parentId:this.props.post.id.toString(),
      timestamp: this.state.edit ? this.state.comment.timestamp : Date.now(),
      voteScore:this.state.edit ? this.state.comment.voteScore : 1,
      author:'alex',
      deleted:false,
      parentDeleted:false
    };
    
    if (!commentObj.body) {
      this.props.createCommentError(true);
      return;
    }

    this.state.edit ? this.props.editComment(commentObj) : this.props.createComment(commentObj);
    //if (!this.props.commentError) this.setState({ openModal: false });
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  render() {
    const sortByKey = key => (a, b) => a['voteScore'] < b['voteScore'];	// desc (number)

    return (
      <div>
        <br />
        <div>Title: { this.props.post.title }</div>
        <div>Body: { this.props.post.body }</div>
        <div>Author: { this.props.post.author }</div>
        <div>Time: { utils.niceDate(this.props.post.timestamp) }</div>
        <div>Vote Score: { this.props.post.voteScore }</div>
        <div>Category: { this.props.post.category }</div>
        <br/>
        <button onClick={ this.handleModalOpen } 
          type="button" id="openCommentModal" name="openCommentModal">
            Add Comment
        </button>
        <br/><br/>
        <Link to="/" onClick={() => this.props.deletePost(this.props.post.id)}>
          Delete Post
        </Link>
        {' - '} <Link to="/postCreateEdit" onClick={() => this.props.setMode('edit')}>Edit Post</Link>
        <br/><br/>
        <Link to="/">Home</Link>
        <br/><br/>
        Comments: (<NumComments postId={this.props.post.id} />)<br/>
        <ul>
          {this.props.comments.filter(comment => comment.deleted === false && comment.parentId === this.props.post.id)
                              .sort(sortByKey('voteScore'))
                              .map((comment, i) => 
            <li key={i.toString()}>
              {comment.body}<br/>
              Vote Score: {comment.voteScore} {' - '} 
                <a href="javascript:void(0)" onClick={() => this.props.voteComment(comment.id, 'upVote')}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => this.props.voteComment(comment.id, 'downVote')}>downVote</a>
                {' - '}
                <a href="javascript:void(0)" 
                  onClick={() => this.setState({openModal:true, edit:true, comment})}>edit</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => this.props.deleteComment(comment.id)}>delete</a>
                <br/>
            </li>
          )}
        </ul>

        <Modal
          isOpen={this.state.openModal}
          closeTimeoutMS={1}
          contentLabel="Modal"
        >
          <h1>{this.state.edit ? "Edit" : "Add"} Comment</h1>
          <div>
            <form role="form">
              <div>
                <textarea ref={(input) => { this.body = input; }} id="body" placeholder="Body" 
                  defaultValue={ this.state.edit ? this.state.comment.body : '' }
                  maxLength="140" rows="7" />
              </div>
              
              <button onClick={ this.handleComment } type="button" id="submit" name="submit">
                  {this.state.edit ? "Edit" : "Submit"} Comment
              </button>
              <button onClick={() => this.setState({openModal:false})} 
                type="button" id="closeCommentModal" name="closeCommentModal">
                  Close
              </button> 
              {' '}
              <Link to="/">Home</Link>
              <span style={ jsxStyles.error }>{ ' ' } { this.props.commentError ? 'error in comment, please check' : '' }</span>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  return { commentError: state.commentError, posts: state.posts, post: state.post, comment: state.comment, comments: state.comments };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      createComment: (comment) => dispatch(createCommentFetch(comment)),
      editComment: (comment) => dispatch(editCommentFetch(comment)),
      createCommentError: (bool) => dispatch(createCommentErrored(bool)),
      deletePost: (postId) => dispatch(deletePostFetch(postId)),
      deleteComment: (commentId) => dispatch(deleteCommentFetch(commentId)),
      voteComment: (commentId, option) => dispatch(voteCommentFetch(commentId, option)),
      fetchComments: (postId) => dispatch(commentsFetch(postId)),
      setMode: (mode) => dispatch(setMode(mode))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)