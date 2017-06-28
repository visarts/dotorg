import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './globalNav.component.less';

const GlobalNav = (props) => {

  const litSelected = props.location.pathname.includes('/literature') ? 'selected' : 'unselected';
  const artSelected = props.location.pathname.includes('/arts') ? 'selected' : 'unselected';
  const hideDesc = props.location.pathname === '/' ? '' : 'hideDesc';
  const bannerImg = litSelected === 'selected' ? './images/litp.jpg' : './images/frontp.jpg';

  return (
    <nav className="globalNav">

      <div className="frontp">
        {/* <img src={bannerImg} />*/}
      </div>
      <Link to='/literature' className={litSelected}>
        <div className="navDescription">
          <h3 className="title"><Glyphicon glyph="book" className="icon" />The Authors</h3>
          <span className={`desc ${hideDesc}`}>Literature by classic authors line the walls of this section.</span>
        </div>
      </Link>
      <Link to='/arts' className={artSelected}>
        <div className="navDescription">
          <h3 className="title"><Glyphicon glyph="tint" className="icon" />The Artists</h3>
          <span className={`desc ${hideDesc}`}>A fantastic collection of artwork by history's greatest artists.</span>
        </div>
      </Link>
    </nav>
  );
}

export default GlobalNav;
