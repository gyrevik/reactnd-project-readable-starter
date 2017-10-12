import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { createComment } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import * as utils from '../utils';
import * as ReadableAPI from '../ReadableAPI';

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
          
          <button onClick={() => this.setState({openCommentModal:true})} 
            type="button" id="openCommentModal" name="openCommentModal">
              Add Comment
          </button> 
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
                this.props.createComment({body: this.state.comment, parentId:this.props.post.id})} 
                type="button" id="submit" name="submit">
                  Submit Comment
              </button>
            </form>
          </div>
          <button onClick={() => this.setState({openCommentModal:false})} 
            type="button" id="closeCommentModal" name="closeCommentModal">
              Close
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

  return { postCat:state.post.category, post:state.post, comment:state.comment };
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      createComment: createComment,
  	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)