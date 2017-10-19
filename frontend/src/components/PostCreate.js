import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPostFetch, editPostFetch, clearPostCat, setPostCat } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import createHistory from 'history/createBrowserHistory';

class PostCreate extends React.Component {
  constructor(props) {
    super(props);
    //this.handleTitleChange = this.handleTitleChange.bind(this);
    //this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    /*this.state = {
      title:'',
      body:''
    };*/
  }
  
  /*handleTitleChange(e) {
    this.setState({title:e.target.value});
    console.log('in handleTitleChange: ', e.target.value);
  }*/
  
  /*handleBodyChange(e) {
    this.setState({body:e.target.value});
    console.log('in handleBodyChange: ', e.target.value);
  }*/

  handleFormInput() {
    // Explicitly focus the text input using the raw DOM API
    console.log('this.title.value: ', this.title.value);
    console.log('this.body.value: ', this.body.value);

    const postObj = {
      id:         this.edit() ? this.props.post.id : Date.now().toString(), 
      timestamp:  this.edit() ? this.props.post.timestamp : Date.now(),
      title:      this.title.value, 
      body:       this.body.value, 
      author:     'alex',
      category:   this.edit() ? this.props.post.category : this.props.postCat,
      voteScore:  this.edit() ? this.props.post.voteScore : 1,
      deleted:    false
    }

    this.edit() ? this.props.editPost( postObj ) : this.props.createPost( postObj );
  }

  edit = () => {
    const path = createHistory().location.pathname;
    let edit = false;
    if (path !== "/") 
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
        </form>
      </div>
    )
  }
}

// onChange={ this.handleTitleChange }
// onChange={this.handleBodyChange} 

const mapStateToProps = (state, props) => { 
  console.log('CreatePost.mapStateToProps.state.posts: ', state.posts);
  console.log('CreatePost.mapStateToProps.state.cats: ', state.cats);
  return { post: state.post, posts: state.posts, cats: state.cats, postCat: state.postCat };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPostFetch(post)),
    editPost: (post) => dispatch(editPostFetch(post)),
    setPostCat: (cat) => dispatch(setPostCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)