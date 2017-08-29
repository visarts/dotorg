import React from 'react';
import { Link } from 'react-router-dom';
import ListLink from 'SharedComponents/listLink/listLink.component';
import ArtHistory from 'SharedComponents/artHistory/artHistory.component';
import './artsHome.component.less';

const ArtsHome = (props) => {

  document.querySelector('body').scrollTop = 0;

  const artistsList = [];

  for(let index in props.store.artistsData) {
    let artist = props.store.artistsData[index];
    artistsList.push(
      <ListLink
        key={index}
        url={`/arts/a/${index}`}
        text={`${artist.fname} ${artist.lname} (${artist.content.length})`} />
    );
  }


  return (
    <div className="artsHome">
      <h1>Welcome to the Portitude Gallery</h1>
      <h3>The greatest art in history by some of history's greatest artists</h3>
      <ArtHistory />
      <div className="titlesContainer">
        <h3>The Artists</h3>
        <ul className="artistsList">{artistsList}</ul>
      </div>
      <div className="titlesContainer">
        <h3>The Eras</h3>
        <ul className="erasList">
          <ListLink url="arts/g/Renaissance" text="Renaissance" />
          <ListLink url="arts/g/Baroque" text="Baroque" />
          <ListLink url="arts/g/Pre-Raphaelite" text="Pre-Raphaelite" />
          <ListLink url="arts/g/Academic" text="Academic" />
          <ListLink url="arts/g/Impressionism" text="Impressionism" />
          <ListLink url="arts/g/Post-Impressionism" text="Post-Impressionism" />
          <ListLink url="arts/g/Realism" text="Realism" />
          <ListLink url="arts/g/Modernism" text="Modernism" />
        </ul>
      </div>
    </div>
  );
}

export default ArtsHome;
