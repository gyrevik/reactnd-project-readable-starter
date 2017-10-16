import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { createComments, createComment, deletePost, voteComment } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import * as utils from '../utils';
import * as ReadableAPI from '../ReadableAPI';
import createHistory from 'history/createBrowserHistory';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
    
    console.log('initializing local state in constructor');

    this.state = {
      comment:'',
      comments: [],
      openModal:false
    };
  }
  
  handleCommentChange(e) {
    this.setState({comment:e.target.value});
    console.log('handleCommentChange: ', e.target.value);
  }

  handleComment() {
    this.props.createComment({
      body: this.state.comment, 
      id:Date.now().toString(),
      parentId:this.props.post.id.toString(),
      timestamp: Date.now(),
      voteScore:1,
      author:'alex',
      deleted:false,
      parentDeleted:false
    })

    this.setState({openCommentModal:false});
    console.log('handleComment executed');
  }

  componentDidMount() {
    console.log(`PostView.js.componentDidMount state: ${JSON.stringify(this.state)}`);
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
        <div>id: { this.props.post.id }</div>
        <div>deleted: { this.props.post.deleted  === true ? 'true' : 'false' }</div>
        
        <button onClick={() => this.setState({openCommentModal:true})} 
          type="button" id="openCommentModal" name="openCommentModal">
            Add Comment
        </button>
        <br/><br/>
        <a href="javascript:void(0)" onClick={() => this.props.deletePost(this.props.post.id)}>
          Delete Post
        </a>
        <br/><br/>
        <Link to="/">Home</Link>
        <br/><br/>
        Comments:<br/>
        <ul>
          {//[ ...this.state.comments, ...this.props.comments ].sort(sortByKey('voteScore')).map((comment, i) => 
            this.props.comments.sort(sortByKey('voteScore')).map((comment, i) => 
            <li key={i.toString()}>
              id: {comment.id}<br/>
              {comment.body}<br/>
              Vote Score: {comment.voteScore} {' - '} 
                <a href="javascript:void(0)" onClick={() => this.props.voteComment(comment.id, 'upVote')}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => this.props.voteComment(comment.id, 'downVote')}>downVote</a><br/>
            </li>
          )}
        </ul>

        <Modal
          isOpen={this.state.openCommentModal}
          closeTimeoutMS={1}
          contentLabel="Modal"
        >
          <h1>Add Comment</h1>
          <div>
            <form role="form">
              <div>
                <textarea onChange={ this.handleCommentChange } id="body" placeholder="Body" 
                  maxLength="140" rows="7" />
              </div>
              
              <button onClick={ this.handleComment } type="button" id="submit" name="submit">
                  Submit Comment
              </button>
            </form>
          </div>
          <button onClick={() => this.setState({openCommentModal:false})} 
            type="button" id="closeCommentModal" name="closeCommentModal">
              Close
          </button> 
          <button
            type="button" onClick={() => window.location.replace("/")}>
            Home
          </button>
          
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('PostView.mapStateToProps.state.posts: ', state.posts);
  console.log('PostView.mapStateToProps.state.comments: ', state.comments);
  console.log('PostView.mapStateToProps.state.post: ', state.post);
  console.log('typeof(state.comments): ', typeof(state.comments));

  console.log('getting comments from server in mapStateToProps');
  let cfs, comments;
  let propsObj = ReadableAPI.getComments(state.post.id).then((cfs) => {
    //console.log('componentDidMount typeof(JSON.parse(cfs)): ', typeof(JSON.parse(cfs)));
    comments = JSON.parse(cfs);
    //this.setState({comments});
    createComments(comments);  // put comments from server into redux store

    return { posts: state.posts, post: state.post, comment: state.comment, comments: state.comments };
  })

  return propsObj;
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      createComments: createComments,
      createComment: createComment,
      deletePost: deletePost,
      voteComment: voteComment
  	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)