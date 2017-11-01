import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { setPostCat, catsFetch } from '../actions/actions';

class CatSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.props.setPostCat(value);

  componentDidMount() {
    this.props.catsFetch();
  }
  
  render () {
    const { cats, postCat } = this.props;
    return (
      <span>
        <SelectField value={postCat==='all' ? 'react': postCat} 
          onChange={this.handleChange} floatingLabelText="Post Category">
          {cats.map((cat, i) =>
            <MenuItem key={i.toString()} value={cat.name} primaryText={cat.name} />
          )}
        </SelectField>
      </span>
    )
  }
}

const mapStateToProps = ({ cats, postCat }) => { 
  return { cats, postCat };
}

export default connect(mapStateToProps, {catsFetch, setPostCat})(CatSet)