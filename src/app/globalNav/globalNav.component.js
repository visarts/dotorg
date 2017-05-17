import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {

  const litSelected = props.currentPath.includes('/literature') ? 'selected' : 'unselected';
  const artSelected = props.currentPath.includes('/arts') ? 'selected' : 'unselected';
  const hideDesc = props.currentPath === '/' ? '' : 'hideDesc';
  return (
    <nav className="globalNav">


      <Link to='/literature' className={litSelected}>
        <div className="navDescription">
          <h4 className="title">The Authors</h4>
          <span className={`desc ${hideDesc}`}>Literature by classic authors line the walls of this section.</span>
        </div>
      </Link>
      <Link to='/arts' className={artSelected}>
        <div className="navDescription">
          <h4 className="title">The Artists</h4>
          <span className={`desc ${hideDesc}`}>A fantastic collection of artwork by history's greatest artists.</span>
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
