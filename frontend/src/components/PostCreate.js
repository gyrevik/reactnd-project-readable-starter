import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPostFetch, editPostFetch, clearPostCat, setPostCat } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';
import createHistory from 'history/createBrowserHistory';

class PostCreate extends React.Component {
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
    const path = createHistory().location.pathname;
    let edit = false;
    if (path !== "/") edit = true;

    const postObj = {
      id: edit ? this.props.post.id : Date.now().toString(), 
      timestamp: Date.now(),
      title: this.state.title, 
      body: this.state.body, 
      author: 'alex',
      category: this.props.postCat,
      voteScore: 1,
      deleted: false
    }

    return (
      <div>  
      	<p><CatSet /></p>
        Mode: { edit ? "edit" : "add" }
        <form role="form">
          <br />
          <div>
          	<input type="text" onChange={this.handleTitleChange} id="title" 
              defaultValue={ edit ? this.props.post.title : "" }
              name="title" placeholder="Title" required />
          </div>

          <div>
          	<textarea onChange={this.handleBodyChange} id="body"
              defaultValue={ edit ? this.props.post.body : "" } placeholder="Body" maxLength="140" rows="7" />
          </div>

          <button onClick={ () => edit ? 
            this.props.editPost( postObj ) : 
            this.props.createPost( postObj ) } 
            type="button" id="submit" name="submit">
              { edit ? "Edit Post" : "Add Post" }
          </button>
        </form>
      </div>
    )
  }
}

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