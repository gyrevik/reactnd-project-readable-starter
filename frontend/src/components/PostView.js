import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { createComment, deletePost } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import * as utils from '../utils';
import * as ReadableAPI from '../ReadableAPI';
import createHistory from 'history/createBrowserHistory';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    
    this.state = {
      comment:'',
      openModal:false
    };
  }
  
  handleCommentChange(e) {
    this.setState({comment:e.target.value});
    console.log('handleCommentChange: ', e.target.value);
  }
  
  componentDidMount() {
    console.log(`PostView.js.componentDidMount state: ${JSON.stringify(this.state)}`);
  }

  render() {
    return (
      <div>
        <form role="form">
          <br />
          <div>
          	<input type="text" id="title" readOnly="true"
      		    name="title" placeholder="Title" required value={ this.props.post.title } />
          </div>
          <div>
          	<textarea id="body" placeholder="Body" readOnly="true"
      		    maxLength="140" rows="7" value={ this.props.post.body } />
          </div>
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
          <a href="javascript:void(0)" onClick={
            () => this.props.deletePost(this.props.post.id)
          }>
            delete post
          </a>
          <br/><br/>
          <Link to="/">Home</Link>
        </form>

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
              
              <button onClick={() => 
                this.props.createComment({
                  body: this.state.comment, 
                  id:Date.now().toString(),
                  parentId:this.props.post.id.toString(),
                  voteScore:1,
                  author:'alex',
                  deleted:false,
                  parentDeleted:false
                  })} 
                  type="button" id="submit" name="submit">
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
  ReadableAPI.getComments(state.post.id).then((comments) => {
    console.log('comments from server for post.id {', state.post.id, '}: ', comments);
  });

  //if (state.post.deleted) window.location.replace("/");
  

  return { posts: state.posts, postCat: state.post.category, post: state.post, comment: state.comment };
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      createComment: createComment,
      deletePost: deletePost,
  	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)