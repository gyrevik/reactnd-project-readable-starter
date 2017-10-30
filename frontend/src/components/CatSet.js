import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { setPostCat, catsFetch } from '../actions/actions';
import cats from '../reducers/cats';
import postCat from '../reducers/postCat';
import * as jsxStyles from '../jsxStyles';

class CatSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  //handleChange = (event, index, value) => this.setState({value});
  handleChange = (event, index, value) => this.props.setPostCat(value);

  componentDidMount() {
    this.props.catsFetch();
  }
  
  render () {
    console.log('this.props.postCat: ', this.props.postCat)
    const { cats, postCat, setPostCat } = this.props;
    return (
      <span>
        <DropDownMenu value={postCat==='all' ? 'react': postCat} onChange={this.handleChange}>
          {cats.map((cat, i) =>
            <MenuItem key={i.toString()} value={cat.name} primaryText={cat.name} />
          )}
        </DropDownMenu>
        <RaisedButton label="Post Category:" disableTouchRipple={true} />
        {cats.map ((cat, i) =>
          <RaisedButton key={i.toString()} label={cat.name} primary={postCat===cat.name ? true : false}
            onClick={() => setPostCat(cat.name)}
          />
        )}
      </span>
    )
  }
}

const mapStateToProps = ({ cats, postCat }) => { 
  return { cats, postCat };
}

export default connect(mapStateToProps, {catsFetch, setPostCat})(CatSet)