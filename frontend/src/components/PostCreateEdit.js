import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPostFetch, editPostFetch, clearPostCat, setPostCat } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import * as jsxStyles from '../jsxStyles';

class PostCreateEdit extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleFormInput = this.handleFormInput.bind(this);
  }
  
  handleFormInput() {
    const postObj = {
      id:         this.edit() ? this.props.post.id : Math.random().toString(), 
      timestamp:  this.edit() ? this.props.post.timestamp : Date.now(),
      title:      this.title.value, 
      body:       this.body.value, 
      author:     'alex',
      category:   this.edit() ? this.props.post.category : this.props.postCat,
      voteScore:  this.edit() ? this.props.post.voteScore : 1,
      deleted:    false
    }

    this.edit() ? this.props.editPost( postObj ) : this.props.createPost( postObj );
    if (!this.props.postError) {
      console.log(`this.props.history.push('/post')`);
      this.props.history.push('/post');
    }
  }

  edit = () => {
    const path = createHistory().location.pathname;
    let edit = false;
    if (path !== '/' && path !== "/category") 
      edit = true;
    return edit;
  }
  
  render() {
    return (
      <div>  
      	<p><CatSet /></p>
        Mode: { this.edit() ? "edit" : "add" }
        <form role="form">
          <br />
          <div>
          	<input type="text" 
              ref={(input) => { this.title = input; }} 
              id="title" 
              defaultValue={ this.edit() ? this.props.post.title : "" }
              name="title" placeholder="Title" required />
          </div>
          <div>
          	<textarea 
              id="body"
              ref={(input) => { this.body = input; }} 
              defaultValue={ this.edit() ? this.props.post.body : "" } placeholder="Body" maxLength="140" rows="7" />
          </div>
          <button onClick={ this.handleFormInput } 
            type="button" id="submit" name="submit">
            { this.edit() ? "Edit Post" : "Add Post" }
          </button>
          { /*ButtonCreateEdit*/ }
          <span style={ jsxStyles.error }>{ ' ' } { this.props.postError ? 'error in post, please check' : '' }</span>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  return { postError: state.postError, post: state.post, posts: state.posts, cats: state.cats, postCat: state.postCat };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPostFetch(post)),
    editPost: (post) => dispatch(editPostFetch(post)),
    setPostCat: (cat) => dispatch(setPostCat(cat))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCreateEdit))