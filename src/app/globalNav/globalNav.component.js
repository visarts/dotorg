import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {

  const litSelected = props.currentPath.includes('/literature') ? 'selected' : 'unselected';
  const artSelected = props.currentPath.includes('/arts') ? 'selected' : 'unselected';
  return (
    <nav className="globalNav">


      <Link to='/literature' className={litSelected}>
        <div className="navDescription">
          <span className="title">The Authors</span><br />
          <span className="desc">Literature by classic authors line the walls of this section.</span>
        </div>
      </Link>
      <Link to='/arts' className={artSelected}>
        <div className="navDescription">
          <span className="title">The Artists</span><br />
          <span className="desc">A fantastic collection of artwork by history's greatest artists.</span>
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
