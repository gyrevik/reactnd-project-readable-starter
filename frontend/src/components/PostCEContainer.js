import React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as actions from '../actions/actions';
import Header from '../components/Header';
import CatSet from '../components/CatSet';
import PostCEForm from '../components/PostCEForm';

class PostCEContainer extends React.Component {
  componentDidMount() {
    this.props.editPostErrored(false);
    this.props.edit && this.props.postFetch(this.props.match.params.post_id);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <CatSet />
          <PostCEForm 
            post={this.props.post} 
            edit={this.props.edit} 
            postError={this.props.postError}
            postCat={this.props.postCat}
            editPostFetch={this.props.editPostFetch}
            editPostErrored={this.props.editPostErrored}
            createPostFetch={this.props.createPostFetch}
            createPostErrored={this.props.createPostErrored}
            history={this.props.history}
            match={this.props.match} />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ cats, postError, post, posts, postCat }) => {
  return { postError, post, posts, cats, postCat };
}

export default withRouter(connect(mapStateToProps, actions)(PostCEContainer))