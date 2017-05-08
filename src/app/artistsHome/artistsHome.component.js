import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './artistsHome.component.less';


const ArtistsHome = (props) => {
  const artist = props.match.params.artist;
  const artistData = dataService.getArtistData(artist);
  const titles = artistData.works.map((item, index) => {
    return (
      <ul key={index}>
        <li key={index}>
          <Link to={`${artist}/artists/${item.fileName}`}>{item.title}</Link>
        </li>
      </ul>
    );
  });

  return (
    <div className="artistsHome">
      <div className="section">
        <h1>{`${artistData.fname} ${artistData.lname}`}</h1>
        <div>Anyone lived in a pretty how town with up so floating many bells down.</div>
        <div>{ titles }</div>
      </div>
    </div>
  );
}

export default ArtistsHome;
