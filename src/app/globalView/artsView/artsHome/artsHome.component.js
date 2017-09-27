import React from 'react';
import { Link } from 'react-router-dom';
import ListLink from 'SharedComponents/listLink/listLink.component';
import ArtHistory from 'SharedComponents/artHistory/artHistory.component';
import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import './artsHome.component.less';

const ArtsHome = (props) => {

  document.querySelector('body').scrollTop = 0;
  document.title = `Portitude Gallery`;

  const artistsList = [];

  for(let artistKey in props.store.artistsData) {
    let artist = props.store.artistsData[artistKey];
    artistsList.push(
      <ListLink
        key={artistKey}
        url={`/arts/a/${artistKey}`}
        text={`${artist.fname} ${artist.lname}`}
        other={artist.bio}>
        {/*<div style={{display: 'flex', flexWrap: 'nowrap', overflow: 'hidden'}}>
          {
            artist.content.map((item, index) => {
              return (
                <img
                  style={{width: '40px', height: '40px', padding: '5px 5px 5px 0px'}}
                  key={item.fileName}
                  src={`./content/artwork/${artistKey}/${item.fileName}_sm.jpg`}
                  alt={item.title} />
              )
            })
          }
        </div>*/}
      </ListLink>
    );
  }


  return (
    <div className="artsHome">
      <h1>Welcome to the Portitude Gallery</h1>
      <div className="homeDescription">The greatest art in history by some of history's greatest artists</div>
      <ArtHistory />
      <div className="titlesContainer">
        <SectionHeader text="The Eras" />
        <ul className="erasList">
          <ListLink url="arts/g/renaissance" text="Renaissance" inlined={true} />
          <ListLink url="arts/g/baroque" text="Baroque" inlined={true} />
          <ListLink url="arts/g/pre-raphaelite" text="Pre-Raphaelite" inlined={true} />
          <ListLink url="arts/g/academic" text="Academic" inlined={true} />
          <ListLink url="arts/g/impressionism" text="Impressionism" inlined={true} />
          <ListLink url="arts/g/post-impressionism" text="Post-Impressionism" inlined={true} />
          <ListLink url="arts/g/realism" text="Realism" inlined={true} />
          <ListLink url="arts/g/modernism" text="Modernism" inlined={true} />
        </ul>
      </div>
      <div className="titlesContainer">
        <SectionHeader text="The Artists" />
        <ul className="artistsList">{artistsList}</ul>
      </div>
    </div>
  );
}

export default ArtsHome;
