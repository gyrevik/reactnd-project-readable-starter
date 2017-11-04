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
    console.log('this.props.match: ', this.props.match)
    this.props.postFetch(this.props.match.params.post_id);
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps this.props.post: ', this.props.post)
    console.log('componentWillReceiveProps nextProps.post: ', nextProps.post)
  }

  edit = () => {
    return this.props.match.path === '/:category/edit/:post_id';
  }

  render() {
    console.log('render this.props.post: ', this.props.post)
    return (
      <MuiThemeProvider>
        <div>
          <Header appIntro="Readable Post Create/Edit View" />
          <div><CatSet /></div>
            <PostCEForm 
              post={this.props.post} 
              edit={this.edit()} 
              postError={this.props.postError}
              editPostFetch={this.props.editPostFetch}
              createPostFetch={this.props.createPostFetch}
              history={this.props.history} />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ cats, postError, post, posts, postCat }) => { 
  console.log('mapStateToProps.post: ', post)

  return { postError, post, posts, cats, postCat };
}

export default withRouter(connect(mapStateToProps, actions)(PostCEContainer))