import { Link } from 'react-router-dom';
import Favorite from 'material-ui-icons/Favorite';
import './globalHeader.component.scss';

const GlobalHeader = (props) => {

  return (
    <div className="header">
      <Link to="/">
        <h1><Favorite /> Portitude</h1>
      </Link>
    </div>
  );
};

export default GlobalHeader;
