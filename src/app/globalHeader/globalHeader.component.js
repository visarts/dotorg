import React from 'react';
import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const smallLogoClass = location.hash !== '#/' ? 'smallLogo' : '';
  const subHeader = props.store.currentSection === 'literature' ? 'library' : props.store.currentSection === 'arts' ? 'gallery' : '';
  const subSubHeader = props.store.currentCreator ? `${decodeURIComponent(props.store.currentCreator.lname.toLowerCase())}` : '';

  const sectionUrl = `/${props.store.currentSection}`;
  const creatorUrl = props.store.currentCreator ? `${sectionUrl}/${props.store.currentCreator.creatorKey}` : '';

  return (
    <div className="globalHeader">
      <div className="globalContainer">
        <h1 className={smallLogoClass}>
          <Link to="/" className="portitudeTitle">Portitude</Link>
          <Link to={sectionUrl} className={props.store.currentSection ? '' : 'hidden'}>
            <span className="subHead">
              {subHeader}
            </span>
          </Link>
          <Link to={creatorUrl} className={props.store.currentCreator ? '' : 'hidden'}>
            <span className="subHead">
              {subSubHeader}
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
