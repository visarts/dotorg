import React from 'react';
import { Link } from 'react-router-dom';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  return (
    <div className="globalHeader">
      <h1>
        <Link to="/">Portitude</Link>
      </h1>
    </div>
  );
}

export default GlobalHeader;
