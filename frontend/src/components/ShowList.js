import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {darkBlack, grey400} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import NumComments from '../components/NumComments.js';
import { niceDate } from '../helper';

class ShowList extends React.Component { 
  render () {
    const {posts, viewCat, votePostFetch, sortPostsField, deletePostFetch, setPostCurrent } = this.props;

    return ( 
      <List>
        {posts.filter(post => (post.category === viewCat 
                || viewCat === 'all' || viewCat === 'home') && post.deleted !== true)
              .map((post, i) =>
          <span key={Math.random()}>
            <Subheader key={Math.random()}>{ niceDate(post.timestamp) }</Subheader>
            <ListItem
              key={i.toString()}
              rightIconButton={
                <IconMenu iconButtonElement={
                  <IconButton
                    touch={true}
                    tooltip=""
                    tooltipPosition="bottom-left">
                    <MoreVertIcon color={grey400} />
                  </IconButton>}>
                  <MenuItem onClick={() => votePostFetch(post.id, 'upVote', sortPostsField)}>upVote</MenuItem>
                  <MenuItem onClick={() => votePostFetch(post.id, 'downVote', sortPostsField)}>downVote</MenuItem>
                  <MenuItem onClick={() => deletePostFetch(post.id)}>delete</MenuItem>
                  <MenuItem 
                    onClick={() => setPostCurrent(post)}
                    containerElement={<Link to={`/${post.category}/edit/${post.id}`} />}>edit</MenuItem>
                </IconMenu>
              }
              primaryText={<Link to={`/${post.category}/${post.id}`} onClick={() => setPostCurrent(post)}>{ post.title }</Link>} 
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>Category: { post.category } {' '}
                    (<NumComments postId={post.id} /> Comment(s), Vote Score: {post.voteScore})
                  </span>
                  <br/>
                  { post.body } 
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} key={Math.random()} />
          </span>
        )}
      </List>
    )
  }
}

export default ShowList;