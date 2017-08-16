import React from 'react';
import { Route, Link } from 'react-router-dom';
//import Lightbox from 'react-images';
import historyService from 'Services/history.service';
import ArtsDisplay from '../artsDisplay/artsDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './artsArtist.component.less';


const ArtsArtist = (props) => {

  document.querySelector('body').scrollTop = 0;
  const artist = props.store.currentCreator;

  /*state = {
    currentImage: null
  };*/

  const getImages = () => {
    const imageList = [];
    artist.content.map((item, index) => {
      imageList.push({
        src: `./content/artwork/${artist.creatorKey}/${item.fileName}.jpg`,
        thumbnail: `./content/artwork/${artist.creatorKey}/${item.fileName}_sm.jpg`,
        caption: item.title,
        itemKey: item.fileName
      });
      return;
    });
    console.log(imageList);
    return imageList;
  };

  const getThumbs = () => {
    return artist.content.map((item, index) => {
      item.artist = artist;
      //item.index = index;
      return (
        <li className="thumbnail" key={item.fileName}>
          <Link
            to={`${artist.creatorKey}/${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${artist.creatorKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
            <span>{item.title}</span>
          </Link>
        </li>
      );
    });
  };

  const imageList = getImages();
  const thumbs = getThumbs();

  /*openImage (item) {
    //historyService.addToHistory({type: 'artHistory', data: item});
    setState({currentImage: item});
  }*/

  return (
    <div className="artsArtist">
      <h1>{decodeURIComponent(`${artist.fname} ${artist.lname}`)}</h1>
      <div className="artistBio">{ artist.bio }</div>
      <ul className="imageGrid">{ thumbs }</ul>
      <BackToTop />
      <Route path='/arts/:artist/:artwork' render={routeProps => (
        <ArtsDisplay
          imageList={imageList}
          store={props.store}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsArtist;
