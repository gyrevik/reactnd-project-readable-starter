import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import CatSet from '../components/CatSet.js';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
//import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import * as jsxStyles from '../jsxStyles';

const styles = {
  div:{
    display: 'flex',
    flexDirection: 'center',
    padding: 20,
    width: '30%'
  },
  paperLeft:{
    flex: 1,
    height: '100%',
    margin: 10,
    textAlign: 'center',
    padding: 10
  },
  paperRight:{
    height: 300,
    flex: 4,
    margin: 10,
    textAlign: 'center',
  }
};

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

    if (this.title.value === '' || this.body.value === '') {
      edit ? this.props.editPostErrored(true) : this.props.createPostErrored(true);
      return;
    }

    const postObj = {
      id:         edit ? this.props.post.id : Math.random().toString(), 
      timestamp:  edit ? Date.now() : Date.now(),
      title:      this.title.value, 
      body:       this.body.value, 
      author:     'alex',
      category:   edit ? this.props.post.category : this.props.postCat,
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
    const mode = edit ? "Mode: edit" : "Mode: add";
    return (
      <div>
        <div><CatSet /><RaisedButton label={mode} disableTouchRipple={true} /></div>
        <div>
          <div align="center">
            <div style={styles.div}>
              <Paper zDepth={3} style={styles.paperLeft}>

              </Paper>
              <Paper zDepth={3} style={styles.paperRight}>
                <form role="form">
                  <br />
                  <div>
                    <input type="text" 
                      ref={(input) => { this.title = input; }} 
                      id="title" 
                      defaultValue={ edit ? this.props.post.title : "" }
                      name="title" placeholder="Title" required />
                  </div>
                  <div>
                    <textarea 
                      id="body"
                      ref={(input) => { this.body = input; }} 
                      defaultValue={ edit ? this.props.post.body : "" } 
                      placeholder="Body" maxLength="140" rows="7" />
                  </div>
                  <button onClick={ this.handleFormInput }
                    type="button" id="submit" name="submit">
                    { edit ? "Edit Post" : "Add Post" }
                  </button>
                  <span style={ jsxStyles.error }>{ ' ' } { this.props.postError ? 'error in post, please check' : '' }</span>
                </form>
              </Paper>
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