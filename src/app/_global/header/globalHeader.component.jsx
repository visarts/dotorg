import { Link } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './globalHeader.component.scss';

const GlobalHeader = (props) => {

  const handleChange = (event, index, value) => this.setState({value});

  return (
    <div className="header">
      <Link to="/">
        <h1>Portitude</h1>
      </Link>
      <DropDownMenu maxHeight={300} value="RIFGKDJ adg" onChange={handleChange}>
        <MenuItem value="RIFGKDJ adg" key={1} primaryText="first link" />
        <MenuItem value="RIFGKDJ hasdf" key={2} primaryText="first link" />
        <MenuItem value="RIFGKDJ hah" key={3} primaryText="first link" />
        <MenuItem value="RIFGKDJ 23g" key={4} primaryText="first link" />
      </DropDownMenu>
    </div>
  );
};

export default GlobalHeader;
