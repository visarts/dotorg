import React from 'react';
import { Link } from 'react-router-dom';
import './litHome.component.less';

const LitHome = (props) => {
  return (
    <div className="litHome">
      <div className="section">
        <h1>This is the literature home page</h1>
        <p>What time is it? What time is it? No for real what time is it?</p>
        <p><Link to="/literature/aesop">Aesop</Link></p>
      </div>
    </div>
  )
}

export default LitHome;
