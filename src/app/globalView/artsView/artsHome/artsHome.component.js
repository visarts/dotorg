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
        text={`${artist.fname} ${artist.lname}`} />
    );
  });

  return (
    <div className="artsHome">
      <h1>Welcome to the Portitude Art Gallery</h1>
      <h3>The greatest art in history by some of history's greatest artists</h3>
      <ArtHistory />
      <ul className="artistsList">{artistsList}</ul>
    </div>
  );
}

export default ArtsHome;
