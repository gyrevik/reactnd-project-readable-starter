import React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as actions from '../actions/actions';
import CatSet from '../components/CatSet.js';
import * as jsxStyles from '../jsxStyles';

class PostCreateEdit extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  componentDidMount() {
    this.props.editPostErrored(false);
  }
  
  handleFormInput() {
    const edit = this.edit();
    if (this.title.input.value === '' || this.body.getValue() === '') {
      edit ? this.props.editPostErrored(true) : this.props.createPostErrored(true);
      return;
    }

    const category = this.props.postCat === 'all' ? 'react' : this.props.postCat;
    const postObj = {
      id:         edit ? this.props.post.id : Math.random().toString(), 
      timestamp:  edit ? Date.now() : Date.now(),
      title:      this.title.input.value, 
      body:       this.body.getValue(), 
      author:     'alex',
      category:   category,
      voteScore:  edit ? this.props.post.voteScore : 1,
      deleted:    false
    }

    edit ? this.props.editPostFetch( postObj ) : this.props.createPostFetch( postObj );

    if (edit) this.props.history.push('/post');
  }

  edit = () => {
    const path = createHistory().location.pathname;
    let edit = false;
    if (path !== '/' && path !== "/category") 
      edit = true;
    return edit;
  }
  
  render() {
    const edit = this.edit();
    //const mode = edit ? "Mode: edit" : "Mode: add";
    return (
      <div>
        <div><CatSet /></div>
        <div>
          <div align="center">
            <div>
              <form>
                <br />
                <div>
                  <TextField
                    ref={(TextField) => { this.title = TextField; }} 
                    id="title" 
                    defaultValue={ edit ? this.props.post.title : "" }
                    name="title" hintText="Title" required />
                </div>
                <div>
                  <TextField 
                    ref={(TextField) => { this.body = TextField; }} 
                    id="body"
                    defaultValue={ edit ? this.props.post.body : "" } 
                    name="body" hintText="Body" required 
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                  />
                </div>
                <RaisedButton onClick={ this.handleFormInput }
                  type="button" id="submit" name="submit">
                  { edit ? "Edit Post" : "Add Post" }
                </RaisedButton>
                <span style={ jsxStyles.error }>{ ' ' } { this.props.postError ? 'error in post, please check' : '' }</span>
              </form>
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cats, postError, post, posts, postCat }) => { 
  return { postError, post, posts, cats, postCat };
}

export default withRouter(connect(mapStateToProps, actions)(PostCreateEdit))