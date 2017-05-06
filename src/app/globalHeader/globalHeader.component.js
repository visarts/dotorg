import React from 'react';
import { Link } from 'react-router-dom';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const currentLocation = location.hash.slice(2);
  const subHead = (() => {
    if (currentLocation.indexOf('literature') > -1) {
      return ': the library'
    } else if (currentLocation.indexOf('arts') > -1) {
      return ': the gallery'
    } else {
      return '';
    }
  })();

  return (
    <div className="globalHeader">
      <h1>
        <Link to="/">Portitude{subHead}</Link>
      </h1>
    </div>
  );
}

export default GlobalHeader;
