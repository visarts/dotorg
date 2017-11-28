import { Link } from 'react-router-dom';
import Search from 'SharedComponents/search/search.component';
import styles from './globalHeader.component.less';

const GlobalHeader = (props) => {

  const hiddenKey = 'hidden';
console.log(props.appState.routing);
  const routing = props.appState.routing;
  const dataType = routing.currentSection;

  // returns author/artist name or genre/era depending on the route direction
  const currentCreator = (() => {
    if (routing.routeKey === 'a' && routing.currentCreator) {
      return props.store[dataType][routing.currentCreator];
    } else if (routing.routeKey === 'g' && routing.currentSubSection) {
      return routing.currentSubSection;
    } else {
      return hiddenKey;
    }
  })();

  const smallLogoClass = routing.currentSection !== '' ? 'smallLogo' : '';
  const subHeader = routing.currentSection === 'literature' ? 'library' : routing.currentSection === 'artwork' ? 'gallery' : routing.currentSection;
  const subSubHeader = currentCreator.lname ? `${currentCreator.lname.toLowerCase()}` : currentCreator;

  const sectionUrl = `/${routing.currentSection}`;
  const subsection = routing.routeKey === 'g' ? routing.currentSubSection : routing.currentCreator;
  const creatorUrl = currentCreator ? `${sectionUrl}/${routing.routeKey}/${subsection}` : '';

/*
<div className={styles.header_small}>
  <div className={`wrapper ${styles.headline}`}>
    <div className="globalContainer">
      <h1 className={smallLogoClass}>
        <Link to="/" className="portitudeTitle">Portitude</Link>
        <Link to={sectionUrl} className={routing.currentSection ? '' : 'hidden'}>
          <span className="subHead">
            {subHeader}
          </span>
        </Link>
        <Link to={creatorUrl} className={currentCreator}>
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
</div>
*/


  return (
    <div className={`${styles.header} ${styles[props.appState.routing.currentSection]}`}>
      <h1>
        <Link to="/" className="portitudeTitle">Portitude</Link>
        <Link to={sectionUrl} className={routing.currentSection ? '' : 'hidden'}>
          <span className="subHead">
            {subHeader}
          </span>
        </Link>
        <Link to={creatorUrl} className={currentCreator}>
          <span className="subHead subSubHead">
            {subSubHeader}
          </span>
        </Link>
      </h1>
    </div>
  );
};

export default GlobalHeader;
