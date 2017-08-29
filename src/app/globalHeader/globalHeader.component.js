import React from 'react';
import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const routing = props.appState.routing;

  const smallLogoClass = location.hash !== '#/' ? 'smallLogo' : '';
  // const subHeader = routing.currentSection === 'literature' ? 'library' : routing.currentSection === 'arts' ? 'gallery' : routing.currentSection;
  // const dataType = routing.currentSection === 'literature' ? 'authorsData' : 'artistsData';
  // const currentCreator = !routing.isSpecial && routing.currentCreator ? props.store[dataType][routing.currentCreator] : '';
  // const subSubHeader = currentCreator.lname ? `${decodeURIComponent(currentCreator.lname.toLowerCase())}` : routing.currentCreator;
  //
  // const sectionUrl = `/${routing.currentSection}`;
  // const creatorUrl = routing.currentCreator ? `${sectionUrl}/${routing.currentSubSection}/${routing.currentCreator}` : '';

  return (
    <div className="globalHeader">
      <div className="globalContainer">
        <h1 className={smallLogoClass}>
          <Link to="/" className="portitudeTitle">Portitude</Link>
          {/*<Link to={sectionUrl} className={routing.currentSection ? '' : 'hidden'}>
            <span className="subHead">
              {subHeader}
            </span>
          </Link>
          <Link to={creatorUrl} className={routing.currentCreator ? '' : 'hidden'}>
            <span className="subHead">
              {subSubHeader}
            </span>
          </Link>*/}
        </h1>
        <Search
          updateAppState={props.updateAppState}
          store={props.store}
         />
      </div>
    </div>
  );
}

export default GlobalHeader;
