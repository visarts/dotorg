import React from 'react';
import { Link } from 'react-router-dom';
import './artsHome.component.less';

const ArtsHome = (props) => {

  const artistsList = props.artistsData.map((artist, index) => {
    return (
      <li key={index}>
        <Link key={index} to={`/arts/${artist.artistKey}`}>
          {artist.fname} {artist.lname}
        </Link>
      </li>
    );
  });

  return (
    <div className="artsHomeComponent">
      <div className="section">
        <h1>This is the arts home page</h1>
        <p>These woods are lovely, dark, and deep, but I have promises to keep, and miles to go before I sleep</p>
        <ul>{artistsList}</ul>
      </div>
    </div>
  );
}

export default ArtsHome;
