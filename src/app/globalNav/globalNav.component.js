import React from 'react';
import { Link } from 'react-router-dom';
import './globalNav.component.less';

const GlobalNav = (props) => {
  return (
    <nav className="globalNav">
      <Link to='/'>Home</Link>
      <Link to='/arts'>Arts</Link>
    </nav>
  );
}

export default GlobalNav;
