import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as jsxStyles from '../jsxStyles';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class PostCEForm extends React.Component {  //= ({ post, postError, edit }) => (
  constructor(props, context) {
    super(props, context);
    console.log('props.post in constructor: ', props.post)
    console.log('this.props.post in constructor: ', this.props.post)
    this.state = {
      title: '',
      body: ''
    };
    
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  componentDidMount () {
    console.log('componentDidMount this.props.post: ', this.props.post)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps this.props.post: ', this.props.post)
    console.log('componentWillReceiveProps nextProps.post: ', nextProps.post)
    console.log('componentWillReceiveProps nextProps.post.title: ', nextProps.post.title)
    console.log('componentWillReceiveProps nextProps.post.body: ', nextProps.post.body)

    console.log(typeof(nextProps.post.title === undefined))
    console.log(nextProps.post.title === undefined)
    
    if (nextProps.post.title !== undefined && nextProps.post.body !== undefined)
      this.setState({title: nextProps.post.title, body: nextProps.post.body});
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  
  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleFormInput() {
    const edit = this.props.edit;
    if (this.state.title === '' || this.state.body === '') {
      edit ? this.props.editPostErrored(true) : this.props.createPostErrored(true);
      return;
    }

    const category = this.props.postCat === 'all' ? 'react' : this.props.postCat;
    const postObj = {
      id:         edit ? this.props.post.id : Math.random().toString(), 
      timestamp:  edit ? Date.now() : Date.now(),
      title:      this.state.title, 
      body:       this.state.body,
      author:     'alex',
      category:   category,
      voteScore:  edit ? this.props.post.voteScore : 1,
      deleted:    false
    }

    console.log('edit: ', edit)
    console.log('postObj: ', postObj)
    edit ? this.props.editPostFetch( postObj ) : this.props.createPostFetch( postObj );

    if (edit) this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`);
  }
  
  render() {
    //const edit = this.edit();
    console.log('this.state.title: ', this.state.title)
    console.log('this.state.body: ', this.state.body)
    console.log('render() this.props.post: ', this.props.post)

    return (
      <div>
        <div align="center">
          <div>
            <form>
              <br />
              <div>
                <TextField
                  id="title" 
                  value={ this.state.title }
                  onChange={ this.handleTitleChange }
                  name="title" hintText="Title" required />
              </div>
              <div>
                <TextField 
                  id="body"
                  value={ this.state.body } 
                  onChange={ this.handleBodyChange }
                  name="body" hintText="Body" required 
                  multiLine={true}
                  rows={2}
                  rowsMax={4} />
              </div>
              <RaisedButton onClick={ this.handleFormInput }
                type="button" id="submit" name="submit">
                { this.props.edit ? "Edit Post" : "Add Post" }
              </RaisedButton>
              <span style={ jsxStyles.error }>{ ' ' } { this.props.postError ? 'error in post, please check' : '' }</span>
            </form>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCEForm;