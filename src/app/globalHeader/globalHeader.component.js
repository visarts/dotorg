import React from 'react';
import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import './globalHeader.component.less';

const GlobalHeader = (props) => {

  const routing = props.appState.routing;
  const smallLogoClass = location.hash !== '#/' ? 'smallLogo' : '';
  const subHeader = routing.currentSection === 'literature' ? 'library' : routing.currentSection === 'arts' ? 'gallery' : routing.currentSection;
  const dataType = routing.currentSection === 'literature' ? 'authorsData' : 'artistsData';
  const currentCreator = routing.routeKey === 'a' && routing.currentCreator ?
          props.store[dataType][routing.currentCreator] :
              routing.routeKey === 'g' && routing.currentSubSection ? routing.currentSubSection : '';
  const subSubHeader = currentCreator.lname ? `${decodeURIComponent(currentCreator.lname.toLowerCase())}` : currentCreator;

  const sectionUrl = `/${routing.currentSection}`;
  const subsection = routing.routeKey === 'g' ? routing.currentSubSection : routing.currentCreator;
  const creatorUrl = currentCreator ? `${sectionUrl}/${routing.routeKey}/${subsection}` : '';

  return (
    <header>
      <div className="globalHeader">
        <div className="globalContainer">
          <h1 className={smallLogoClass}>
            <Link to="/" className="portitudeTitle">Portitude</Link>
            <Link to={sectionUrl} className={routing.currentSection ? '' : 'hidden'}>
              <span className="subHead">
                {subHeader}
              </span>
            </Link>
            <Link to={creatorUrl} className={currentCreator ? '' : 'hidden'}>
              <span className="subHead subSubHead">
                {subSubHeader}
              </span>
            </Link>
          </h1>
          <Search
            updateAppState={props.updateAppState}
            store={props.store}
           />
        </div>
      </div>
      <div className={`globalHeaderFoot ${smallLogoClass ? 'hidden' : ''}`}></div>
    </header>
  );
}

export default GlobalHeader;
