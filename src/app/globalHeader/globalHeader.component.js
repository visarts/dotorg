import React from 'react';
import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const smallLogoClass = !props.match.isExact ? 'smallLogo' : '';
  const subHeader = props.store.currentSection === 'literature' ? ' | library' : props.store.currentSection === 'arts' ? ' | gallery' : '';
  const subSubHeader = props.store.currentCreator ? ` | ${props.store.currentCreator.lname}` : '';

  const sectionUrl = `/${props.store.currentSection}`;
  const creatorUrl = props.store.currentCreator ? `${sectionUrl}/${props.store.currentCreator.creatorKey}` : '';

  return (
    <div className="globalHeader">
      <div className="globalContainer">
        <h1 className={smallLogoClass}>
          <Link to="/">Portitude</Link>
          <Link to={sectionUrl}>
            <span className="subHead">
              &nbsp;{subHeader}
            </span>
          </Link>
          <Link to={creatorUrl}>
            <span className="subHead">
              &nbsp;{subSubHeader}
            </span>
          </Link>
        </h1>
        <Search
          updateStore={props.updateStore}
          store={props.store}
         />
      </div>
    </div>
  );
}

export default GlobalHeader;
