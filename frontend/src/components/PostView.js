import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import * as actions from '../actions/actions';
import NumComments from '../components/NumComments';
import { niceDate } from '../helper';
import * as jsxStyles from '../jsxStyles';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip=""
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class PostView extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleComment = this.handleComment.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = { openModal: false, edit: false };
  }
  
  handleModalOpen() {
    this.props.createCommentErrored(false);
    this.setState({ openModal: true })
  }

  handleModalClose() {
    this.props.createCommentErrored(false);
    this.setState({ openModal: false }) 
  }

  handleComment() {
    const commentObj = {
      body: this.body.getValue(), 
      id: this.state.edit ? this.state.comment.id : Math.random().toString(),
      parentId:this.props.post.id.toString(),
      timestamp: this.state.edit ? this.state.comment.timestamp : Date.now(),
      voteScore:this.state.edit ? this.state.comment.voteScore : 1,
      author:'alex',
      deleted:false,
      parentDeleted:false
    };
    
    if (!commentObj.body) {
      this.props.createCommentErrored(true);
      return;
    }

    this.state.edit ? this.props.editCommentFetch(commentObj) : this.props.createCommentFetch(commentObj);
    this.setState({ openModal: false });
  }

  componentDidMount() {
    this.props.commentsFetch(this.props.post_id);
    this.props.postFetch(this.props.post_id);
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={false}
        onClick={this.handleModalClose}
      />,
      <RaisedButton
        label={this.state.edit ? 'Edit' : 'Submit'}
        primary={false}
        onClick={this.handleComment}
      />,
    ];

    const sortByKey = key => (a, b) => a['voteScore'] < b['voteScore'];	// desc (number)
    const { comments, post, deletePostFetch, votePostFetch, voteCommentFetch, setMode, deleteCommentFetch } = this.props;
    
    return (
      <div>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>Title: { post.title }</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Body: { post.body }</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Author: { post.author }</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Time: { niceDate(post.timestamp) }</TableRowColumn>
            </TableRow>
            <TableRow>
            <TableRowColumn>Vote Score: { post.voteScore }</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Category: { post.category }</TableRowColumn>
          </TableRow>
          </TableBody>
        </Table>

        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton onClick={ this.handleModalOpen } 
              id="openCommentModal" name="openCommentModal" label="Comment" />
            
            <RaisedButton label="Delete Post" onClick={() => deletePostFetch(this.props.post_id)}
              containerElement={<Link to="/" />} />
            
            <RaisedButton label="Edit Post" onClick={() => setMode('edit')}
              containerElement={<Link to={`/${this.props.category}/edit/${this.props.post_id}`} />} />

            <RaisedButton label="UP VOTE" onClick={() => votePostFetch(this.props.post_id, 'upVote', 'voteScore')} />
            <RaisedButton label="DOWN VOTE" onClick={() => votePostFetch(this.props.post_id, 'downVote', 'voteScore')} />
          </ToolbarGroup>
        </Toolbar>
        <br/><br/>

        Comments: (<NumComments postId={this.props.post_id} />)<br/>

        <List>
          {comments.filter(comment => comment.deleted === false && comment.parentId === this.props.post_id)
                   .sort(sortByKey('voteScore'))
                   .map((comment, i) => 
            <span key={Math.random()}>
              <Subheader key={Math.random()}>{ niceDate(comment.timestamp) }</Subheader>
              <ListItem
                key={i.toString()}
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onClick={() => voteCommentFetch(comment.id, 'upVote')}>upVote</MenuItem>
                    <MenuItem onClick={() => voteCommentFetch(comment.id, 'downVote')}>downVote</MenuItem>
                    <MenuItem onClick={() => this.setState({openModal:true, edit:true, comment})}>edit</MenuItem>
                    <MenuItem onClick={() => deleteCommentFetch(comment.id)}>delete</MenuItem>
                  </IconMenu>
                }
                primaryText={comment.body} 
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>
                      Vote Score: {comment.voteScore}
                    </span>
                  </p>
                }
                
              />
              <Divider inset={true} key={Math.random()} />
            </span>
          )}
        </List>

        <Dialog
          title="Dialog With Custom Width"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.openModal}
        >
          This dialog spans the entire width of the screen.<br/><br/>
          <TextField 
            ref={(TextField) => { this.body = TextField; }} 
            id="body"
            defaultValue={ this.state.edit ? this.props.post.body : "" } 
            name="body" hintText="Body" required 
            multiLine={true}
            rows={2}
            rowsMax={4}
          />
          <span style={jsxStyles.error}>{this.props.commentError ? 'please submit with text or cancel' : ''}</span>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ commentError, posts, post, comment, comments }) => { 
  return { commentError, posts, post, comment, comments };
}

export default connect(mapStateToProps, actions)(PostView)