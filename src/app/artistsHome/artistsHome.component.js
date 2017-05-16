import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import dataService from 'Services/data.service';
import './artistsHome.component.less';


const ArtistsHome = (props) => {
  const artist = props.match.params.artist;
  const artistData = dataService.getArtistData(artist);
  const thumbs = artistData.content.map((item, index) => {
    return (
      <li className="thumbnail" key={index}>
        <a href="#" title={item.title}>
          <img
            src={`./content/artwork/${artist}/${item.fileName}_sm.jpg`}
            alt={item.title}
          /><br />
          <span>{item.title} ({index + 1} of {artistData.content.length})</span>
        </a>
      </li>
    );
  });

  return (
    <div className="artistsHome">
      <div className="section">
        <h1>{`${artistData.fname} ${artistData.lname}`}</h1>
        <div>Anyone lived in a pretty how town with up so floating many bells down.</div>
        <ul>{ thumbs }</ul>
      </div>
    </div>
  );
}

export default ArtistsHome;
