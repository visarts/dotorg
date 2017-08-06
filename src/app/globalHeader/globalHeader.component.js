import React from 'react';
import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const smallLogoClass = !props.match.isExact ? 'smallLogo' : '';
  const subHeader = props.location.pathname.includes('literature') ? 'library' : props.location.pathname.includes('arts') ? 'gallery' : '';
  const separator = subHeader ? '|' : '';

  return (
    <div className="globalHeader">
      <div className="globalContainer">
        <h1 className={smallLogoClass}>
          <Link to="/">Portitude <span className="subHead">{separator} {subHeader}</span></Link>
        </h1>
        <Search
          storeService={props.storeService}
         />
      </div>
    </div>
  );
}

export default GlobalHeader;
