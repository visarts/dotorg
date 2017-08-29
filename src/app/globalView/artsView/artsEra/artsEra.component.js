import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './artsEra.component.less';


const ArtsEra = (props) => {

  const getTitles = () => {
    let artistsList = [];
    for(let artistKey in props.store.artistsData) {
      let titlesList = [];
      let artist = props.store.artistsData[artistKey];
      for (let i in artist.content) {
        let title = artist.content[i];
        if (artist.era.toLowerCase() === props.appState.routing.currentSubSection) {
          titlesList.push(
            <ListLink
              key={title.fileName}
              url={`/arts/g/${artist.era.toLowerCase()}/${artistKey}/${title.fileName}`}
              text={title.title} />
          );
        }
      }
      if (titlesList.length) {
        artistsList.push(
          <div className="artistBlock" key={artistKey}>
            <h3>{artist.fname} {artist.lname}</h3>
            <ul className="contentBlock">
              {titlesList}
            </ul>
          </div>
        );
      }
    }
    return artistsList;
  }

  const titles = getTitles();

  return (
    <div className="artsEra">
      <h1>{props.appState.routing.currentSubSection}</h1>
      <h2>The best parts of waking up is {props.appState.routing.currentSubSection} in your browser</h2>
      <div className="eraContainer">
        {titles}
      </div>
    </div>
  )
};

export default ArtsEra;
