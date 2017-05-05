import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {
  const litSelected = location.hash.indexOf('literature') > -1 ? 'selected' : '';
  const artsSelected = location.hash.indexOf('arts') > -1 ? 'selected' : '';

  return (
    <nav className="globalNav">


      <Link to='/literature'>
        <div className={`navDescription ${litSelected}`}>
          Literature by classic authors line the walls of this section.
        </div>
      </Link>
      <Link to='/arts'>
        <div className={`navDescription ${artsSelected}`}>
          A fantastic collection of artwork by history's greatest artists.
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
