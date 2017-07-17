import React from 'react';
import { Route, Link } from 'react-router-dom';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import historyService from 'Services/history.service';
import ArtsDisplay from '../artsDisplay/artsDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './artsArtist.component.less';

const ArtsArtist = (props) => {

  document.querySelector('body').scrollTop = 0;
  const artist = props.currentArtist;
  const artistData = dataService.getArtistData(artist.artistKey);


  const getImages = () => {
    const imageList = [];
    artistData.content.map((item, index) => {
      imageList.push({
        src: `./content/artwork/${artist.artistKey}/${item.fileName}.jpg`,
        thumbnail: `./content/artwork/${artist.artistKey}/${item.fileName}_sm.jpg`,
        caption: item.title,
        itemKey: item.fileName
      });
      return;
    });

    return imageList;
  }

  const getThumbs = () => {
    return artistData.content.map((item, index) => {
      item.artist = artist;
      item.index = index;
      return (
        <li className="thumbnail" key={item.fileName}>
          <Link
            to={`${artist.artistKey}/${item.fileName}`}
            title={item.title}
            key={item.fileName}
            onClick={historyService.addToHistory.bind(this, {type: 'artHistory', data: item})}>
            <img
              src={`./content/artwork/${artist.artistKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
            <span>{item.title}</span>
          </Link>
        </li>
      );
    });
  }

  const imageList = getImages();
  const thumbs = getThumbs();

  return (
    <div className="artsArtist">
      <h1>{decodeURIComponent(`${artist.fname} ${artist.lname}`)}</h1>
      <div className="artistBio">{ artist.bio }</div>
      <ul className="imageGrid">{ thumbs }</ul>
      <BackToTop />
      <Route path='/arts/:artist/:artwork' render={routeProps => (
        <ArtsDisplay
          currentArtist={artist}
          imageList={imageList}
          {...routeProps} />
      )} />
    </div>
  );
}

export default ArtsArtist;
