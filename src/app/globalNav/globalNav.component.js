import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {
  const homeSelected = !location.hash[2] ? 'selected' : '';
  const artsSelected = location.hash.indexOf('arts') > -1 ? 'selected' : '';

  return (
    <nav className="globalNav">


      <Link to='/'>
        <div className={`navDescription ${homeSelected}`}>
          A fantastic collection of artwork by history's greatest artists.
        </div>
      </Link>
      <Link to='/arts'>
        <div className={`navDescription ${artsSelected}`}>
          Literature by classic authors line the walls of this section.
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
