import React from 'react';
import { Route, Link } from 'react-router-dom';
//import Lightbox from 'react-images';
import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './artsArtist.component.less';


const ArtsArtist = (props) => {

  const artistKey = props.match.params.artist;
  const artist = props.store.artistsData[artistKey];

  document.title = `Portitude Gallery: ${artist.fname} ${artist.lname}`;

  /*const getImages = () => {
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
  };*/

  const getThumbs = () => {
    return artist.content.map((item, index) => {
      //item.artist = artist;
      //item.index = index;
      return (
        <li className="artThumb" key={item.fileName}>
          <Link
            to={`/arts/a/${artistKey}/${artist.era}/${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${artistKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
            <h3>{item.title}</h3>
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
      <h1 className="artsArtistTitle">
        <span className="fname">{decodeURIComponent(`${artist.fname} `)}</span>
        <span className="lname">{decodeURIComponent(`${artist.lname}`)}</span>
      </h1>
      <div className="artsArtistBio">{ artist.bio }</div>
      <ul className="imageGrid">{ getThumbs() }</ul>
      <BackToTop />
    </div>
  );
};

export default ArtsArtist;
