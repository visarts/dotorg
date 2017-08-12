import React from 'react';
import { Link } from 'react-router-dom';
import ListLink from 'SharedComponents/listLink/listLink.component';
import ArtHistory from 'SharedComponents/artHistory/artHistory.component';
import './artsHome.component.less';

const ArtsHome = (props) => {

  document.querySelector('body').scrollTop = 0;

  const artistsList = props.artistsData.map((artist, index) => {
    return (
      <ListLink
        key={artist.creatorKey}
        url={`/arts/${artist.creatorKey}`}
        action={() => props.updateStore({currentCreator: artist})}
        text={`${artist.fname} ${artist.lname}`} />
    );
  });

  return (
    <div className="artsHome">
      <h1>This is the arts home page</h1>
      <p>These woods are lovely, dark, and deep, but I have promises to keep, and miles to go before I sleep</p>
      <ArtHistory />
      <ul>{artistsList}</ul>
    </div>
  );
}

export default ArtsHome;
