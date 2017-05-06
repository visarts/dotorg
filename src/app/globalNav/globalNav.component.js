import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {
  const litSelected = location.hash.indexOf('literature') > -1 ? 'selected' : '';
  const artsSelected = location.hash.indexOf('arts') > -1 ? 'selected' : '';

  return (
    <nav className="globalNav">


      <Link to='/literature' className={litSelected}>
        <div className="navDescription">
          <span className="title">The Authors</span>
          <span className="desc">Literature by classic authors line the walls of this section.</span>
        </div>
      </Link>
      <Link to='/arts' className={artsSelected}>
        <div className="navDescription">
          <span className="title">The Artists</span>
          <span className="desc">A fantastic collection of artwork by history's greatest artists.</span>
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
