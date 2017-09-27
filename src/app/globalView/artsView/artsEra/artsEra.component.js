import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import './artsEra.component.less';


const ArtsEra = (props) => {

  document.title = `Portitude Gallery: artwork from the ${props.appState.routing.currentSubSection} era`;

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
              thumb={`./content/artwork/${artistKey}/${title.fileName}_sm.jpg`}
              url={`/arts/g/${artist.era.toLowerCase()}/${artistKey}/${title.fileName}`}
              text={title.title}
              other={`${title.date}, ${decodeURIComponent(artist.lname)}`} />
          );
        }
      }
      if (titlesList.length) {
        artistsList.push(
          <div className="artistBlock" key={artistKey}>
            <SectionHeader text={`${decodeURIComponent(artist.fname)} ${decodeURIComponent(artist.lname)}`} />
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
      <div className="homeDescription">The best parts of waking up is {props.appState.routing.currentSubSection} in your browser</div>
      <div className="eraContainer">
        {titles}
      </div>
      <BackToTop />
    </div>
  )
};

export default ArtsEra;
