import React from 'react';
import { Link } from 'react-router-dom';
import './litHome.component.less';

const LitHome = (props) => {

  const authorsList = props.authorsData.map((author, index) => {
    return (
      <li key={index}>
        <Link key={index} to={`literature/${author.authorKey}`}>
          {author.fname} {author.lname}
        </Link>
      </li>
    );
  });

  return (
    <div className="litHome">
      <div className="section">
        <h1>This is the literature home page</h1>
        <p>What time is it? What time is it? No for real what time is it?</p>
        <ul>{authorsList}</ul>
      </div>
    </div>
  )
}

export default LitHome;
