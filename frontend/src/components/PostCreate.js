import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPostFetch, clearPostCat, setPostCat } from '../actions/actions.js';
import CatSet from '../components/CatSet.js';

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
    return (
      <div>  
      	<CatSet />
      
        <form role="form">
          <br />
          <div>
          	<input type="text" onChange={this.handleTitleChange} id="title" name="title" placeholder="Title" required />
          </div>

          <div>
          	<textarea onChange={this.handleBodyChange} id="body" placeholder="Body" maxLength="140" rows="7" />
          </div>

          <button onClick={() => 
            this.props.createPost({
              id: Date.now().toString(), 
              timestamp: Date.now(),
              title: this.state.title, 
              body: this.state.body, 
              author: 'alex',
              category: this.props.postCat,
              voteScore: 1,
              deleted: false
            })} 
            type="button" id="submit" name="submit">
              Add Post
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('CreatePost.mapStateToProps.state.posts: ', state.posts);
  console.log('CreatePost.mapStateToProps.state.cats: ', state.cats);
  return { posts: state.posts, cats: state.cats, postCat: state.postCat };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPostFetch(post)),
    setPostCat: (cat) => dispatch(setPostCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)