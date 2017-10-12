import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { createPost, clearPostCat, setPostCat } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import * as utils from '../utils';
import * as ReadableAPI from '../ReadableAPI';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.state = {
      title:'',
      body:''
    };
  }
  
  handleTitleChange(e) {
    this.setState({title:e.target.value});
    console.log('in handleTitleChange: ', e.target.value);
  }
  
  handleBodyChange(e) {
    this.setState({body:e.target.value});
    console.log('in handleBodyChange: ', e.target.value);
  }
  
  render() {
    return (
      <div>  
      	<CatSet 
          cats={this.props.cats}
          setPostCat={this.props.setPostCat} 
          clearPostCat={this.props.clearPostCat} 
          selectedCat={this.props.postCat} />
      
        <form role="form">
          <br />
          <div>
          	<input type="text" onChange={ this.handleTitleChange } id="title" 
      		  name="title" placeholder="Title" required value={ this.props.post.title } />
          </div>
          <div>
          	<textarea onChange={ this.handleBodyChange } id="body" placeholder="Body" 
      		  maxLength="140" rows="7" value={ this.props.post.body } />
          </div>
      	  <div>Author: { this.props.post.author }</div>
      	  <div>Time: { utils.niceDate(this.props.post.timestamp) }</div>
		      <div>Vote Score: { this.props.post.voteScore }</div>
        </form>

        <Modal
          isOpen={false}
          closeTimeoutMS={1}
          contentLabel="Modal"
        >
          <h1>Modal Content</h1>
          <p>Etc.</p>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('PostView.mapStateToProps.state.posts: ', state.posts);
  console.log('PostView.mapStateToProps.state.cats: ', state.cats);
  console.log('PostView.mapStateToProps.state.post: ', state.post);
  ReadableAPI.getComments(state.post.id).then((comments) => {
    console.log('comments: ', comments);
  });

  return { posts: state.posts, cats: state.cats, postCat: state.post.category, post:state.post };
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      createPost: createPost,
      clearPostCat: clearPostCat,
      setPostCat: setPostCat,
  	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)