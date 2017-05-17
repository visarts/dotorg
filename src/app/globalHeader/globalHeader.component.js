import React from 'react';
import { Link } from 'react-router-dom';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const smallLogoClass = !props.currentMatch.isExact ? 'smallLogo' : '';
  const subHeader = props.currentPath.includes('literature') ? 'library' : props.currentPath.includes('arts') ? 'gallery' : '';
  const separator = subHeader ? '|' : '';

  return (
    <div className="globalHeader">
      <h1 className={smallLogoClass}>
        <Link to="/">Portitude <span className="subHead">{separator} {subHeader}</span></Link>
      </h1>
    </div>
  );
}

export default GlobalHeader;
