import { Link } from 'react-router-dom';
import './globalHeader.component.scss';

const GlobalHeader = (props) => {
  return (
    <div className="header">
      <Link to="/">
        <h1>Portitude</h1>
      </Link>
    </div>
  );
};

export default GlobalHeader;
