import React from 'react';
import { Link } from 'react-router-dom';
import LiteratureHistory from 'SharedComponents/literatureHistory/literatureHistory.component';
import './literatureHome.component.less';

const LiteratureHome = (props) => {

  document.querySelector('body').scrollTop = 0;

  const authorsList = props.authorsData.map((author, index) => {
    return (
      <li key={index}>
        <Link key={index} to={`literature/${author.creatorKey}`}>
          {author.fname} {author.lname}
        </Link>
      </li>
    );
  });

  return (
    <div className="literatureHome">
      <h1>Welcome to the Portitude Library</h1>
      <h3>Classic literature lines the dusty shelves. Make yourself right at home.</h3>
      <LiteratureHistory />
      <ul className="authorsList">{authorsList}</ul>
    </div>
  )
}

export default LiteratureHome;
