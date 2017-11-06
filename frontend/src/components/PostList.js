import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../actions/actions';
import ShowList from '../components/ShowList';

class PostList extends React.Component {
  componentDidMount() {
    const { sortPostsField, viewCat } = this.props;
    this.props.postsFetch(sortPostsField, viewCat);
  }
  
  render () {
    const { posts, sortPostsField, setSortPostsField, setPostCurrent, 
      votePostFetch, deletePostFetch, viewCat } = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <RaisedButton label="Sort by Vote Score" primary={sortPostsField==='voteScore' ? true : false} 
                onClick={() => setSortPostsField('voteScore')}
              />
              <RaisedButton label="Sort by Time" primary={sortPostsField==='timestamp' ? true : false} 
                onClick={() => setSortPostsField('timestamp')}
              />
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>

        <MuiThemeProvider>
          <ShowList posts={posts} viewCat={viewCat} votePostFetch={votePostFetch} sortPostsField={sortPostsField} deletePostFetch={deletePostFetch} setPostCurrent={setPostCurrent} />
        </MuiThemeProvider>
      </div>
    )
  }

  
}

const mapStateToProps = ({ posts, sortPostsField, viewCat }) => {
  return { posts, sortPostsField, viewCat };
}

export default connect(mapStateToProps, actions)(PostList)