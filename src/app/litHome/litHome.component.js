import React from 'react';
import { Link } from 'react-router-dom';
import './litHome.component.less';

const LitHome = (props) => {

  document.querySelector('body').scrollTop = 0;

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
      <div className="globalContainer">
        <h1>Welcome to the Portitude Library</h1>
        <h3>Classic literature lines the dusty shelves. Make yourself right at home.</h3>
        <ul>{authorsList}</ul>
      </div>
    </div>
  )
}

export default LitHome;
