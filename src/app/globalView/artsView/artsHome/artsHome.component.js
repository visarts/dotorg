import React from 'react';
import { Link } from 'react-router-dom';
import ListLink from 'SharedComponents/listLink/listLink.component';
import ArtHistory from 'SharedComponents/artHistory/artHistory.component';
import './artsHome.component.less';

const ArtsHome = (props) => {

  document.querySelector('body').scrollTop = 0;
  document.title = `Portitude Gallery`;

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
          <ListLink url="arts/g/renaissance" text="Renaissance" />
          <ListLink url="arts/g/baroque" text="Baroque" />
          <ListLink url="arts/g/pre-raphaelite" text="Pre-Raphaelite" />
          <ListLink url="arts/g/academic" text="Academic" />
          <ListLink url="arts/g/impressionism" text="Impressionism" />
          <ListLink url="arts/g/post-impressionism" text="Post-Impressionism" />
          <ListLink url="arts/g/realism" text="Realism" />
          <ListLink url="arts/g/modernism" text="Modernism" />
        </ul>
      </div>
    </div>
  );
}

export default ArtsHome;
