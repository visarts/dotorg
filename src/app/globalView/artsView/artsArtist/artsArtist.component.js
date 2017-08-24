import React from 'react';
import { Route, Link } from 'react-router-dom';
//import Lightbox from 'react-images';
import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './artsArtist.component.less';


const ArtsArtist = (props) => {

  document.querySelector('body').scrollTop = 0;
  const artist = props.store.currentCreator;

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


  /*openImage (item) {
    //historyService.addToHistory({type: 'artHistory', data: item});
    setState({currentImage: item});
  }*/

  return (
    <div className="artsArtist">
      <h1>{decodeURIComponent(`${artist.fname} ${artist.lname}`)}</h1>
      <div className="artistBio">{ artist.bio }</div>
      <ul className="imageGrid">{ getThumbs() }</ul>
      <BackToTop />
    </div>
  );
};

export default ArtsArtist;
