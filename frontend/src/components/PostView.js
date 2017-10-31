import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions/actions';
import CatSet from '../components/CatSet.js';
import NumComments from '../components/NumComments.js';
import { niceDate } from '../helper';
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
    this.props.createCommentErrored(false);
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

    this.state.edit ? this.props.editCommentFetch(commentObj) : this.props.createCommentFetch(commentObj);
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.commentsFetch(this.props.post.id);
  }

  render() {
    const sortByKey = key => (a, b) => a['voteScore'] < b['voteScore'];	// desc (number)
    const { comments, commentError, post, deletePostFetch, voteCommentFetch, setMode, deleteCommentFetch } = this.props;
    return (
      <div>
        <br />
        <div>Title: { post.title }</div>
        <div>Body: { post.body }</div>
        <div>Author: { post.author }</div>
        <div>Time: { niceDate(post.timestamp) }</div>
        <div>Vote Score: { post.voteScore }</div>
        <div>Category: { post.category }</div>
        <br/>
        <RaisedButton onClick={ this.handleModalOpen } id="openCommentModal" name="openCommentModal">
          Comment
        </RaisedButton>
        <br/><br/>
        <Link to="/" onClick={() => deletePostFetch(post.id)}>
          Delete Post
        </Link>
        {' - '} <Link to="/postCreateEdit" onClick={() => setMode('edit')}>Edit Post</Link>
        <br/><br/>
        <Link to="/">Home</Link>
        <br/><br/>
        Comments: (<NumComments postId={post.id} />)<br/>
        <ul>
          {comments.filter(comment => comment.deleted === false && comment.parentId === post.id)
                              .sort(sortByKey('voteScore'))
                              .map((comment, i) => 
            <li key={i.toString()}>
              {comment.body}<br/>
              Vote Score: {comment.voteScore} {' - '} 
                <a href="javascript:void(0)" onClick={() => voteCommentFetch(comment.id, 'upVote')}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => voteCommentFetch(comment.id, 'downVote')}>downVote</a>
                {' - '}
                <a href="javascript:void(0)" 
                  onClick={() => this.setState({openModal:true, edit:true, comment})}>edit</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => deleteCommentFetch(comment.id)}>delete</a>
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
            <form>
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
              <span style={ jsxStyles.error }>{ ' ' } { commentError ? 'error in comment, please check' : '' }</span>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ commentError, posts, post, comment, comments }) => { 
  return { commentError, posts, post, comment, comments };
}

export default connect(mapStateToProps, actions)(PostView)