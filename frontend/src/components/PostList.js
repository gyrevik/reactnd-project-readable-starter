import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import * as actions from '../actions/actions';
import NumComments from '../components/NumComments.js';
import { niceDate } from '../helper';
import * as jsxStyles from '../jsxStyles';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class PostList extends React.Component {
  componentDidMount() {
    const { sortPostsField, viewCat } = this.props;
    this.props.postsFetch(sortPostsField, viewCat);
  }
  
  render () {
    const { posts, sortPostsField, setSortPostsField, setPostCurrent, votePostFetch, viewCat } = this.props;
    return (
      <div>
        <ul>
          <li key={Math.random()}>
            Sort by {' '}
            <a href="javascript:void(0)" onClick={() => setSortPostsField('voteScore')}>
              <span style={sortPostsField==="voteScore" ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Vote Score
              </span>
            </a>
            {' - '} 
            <a href="javascript:void(0)" onClick={() => setSortPostsField('timestamp')}>
              <span style={sortPostsField==='timestamp' ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Time
              </span>
            </a>
          </li>
          {posts.filter(post => post.category === viewCat || viewCat === 'all')
                .map((post, i) =>
            <li key={i.toString()}>
              Category: { post.category } {' - '} 
              Title: <Link to="/post" onClick={() => setPostCurrent(post)}>{ post.title }</Link> {' - '} 
              Vote Score: { post.voteScore } {' - '} 
                <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'upVote', sortPostsField)}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'downVote', sortPostsField)}>downVote</a><br/>
              Time: { niceDate(post.timestamp) } <br/>
              Body: { post.body }<br/>
              Number of comments: <NumComments postId={post.id} />
            </li>
          )}
        </ul>
        


        <ul>
        {posts.filter(post => post.category === viewCat || viewCat === 'all')
              .map((post, i) =>
          <li key={i.toString()}>
            Category: { post.category } {' - '} 
            Title: <Link to="/post" onClick={() => setPostCurrent(post)}>{ post.title }</Link> {' - '} 
            Vote Score: { post.voteScore } {' - '} 
              <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'upVote', sortPostsField)}>upVote</a>
              {' - '}
              <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'downVote', sortPostsField)}>downVote</a><br/>
            Time: { niceDate(post.timestamp) } <br/>
            Body: { post.body }<br/>
            Number of comments: <NumComments postId={post.id} />
          </li>
        )}
        </ul>

        <MuiThemeProvider>
        <List>
          <Subheader>Today</Subheader>
          <ListItem
            //leftAvatar={<Avatar src="images/ok-128.jpg" />}
            primaryText="Brunch this weekend?"
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
        </List>
        </MuiThemeProvider>


      </div>
    )
  }
}

const mapStateToProps = ({ posts, sortPostsField, viewCat }) => {
  return { posts, sortPostsField, viewCat };
}

export default connect(mapStateToProps, actions)(PostList)