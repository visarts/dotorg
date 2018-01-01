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
      <DropDownMenu maxHeight={300} value={10} onChange={handleChange}>
        <MenuItem value={1} key={1} primaryText="first link" />
      </DropDownMenu>
    </div>
  );
};

export default GlobalHeader;
