import React from 'react';
import { Link } from 'react-router-dom';
import './homeView.component.less';

const HomeView = (props) => {

  document.querySelector('body').scrollTop = 0;
  const authorKeys = Object.keys(props.store.authorsData);
  const artistKeys = Object.keys(props.store.artistsData);
  const date = new Date();
  const creatorFrequency = date.getMonth();
  const contentFrequency = date.getDay();
  const author = props.store.authorsData[authorKeys[creatorFrequency]];
  const artist = props.store.artistsData[artistKeys[creatorFrequency]];
  const lit = author.content[contentFrequency] ? author.content[contentFrequency] : author.content[author.content.length - 1];
  const art = artist.content[contentFrequency] ? artist.content[contentFrequency] : artist.content[author.content.length - 1];

  const featuredContent = (() => {
    return (
      <div className="featured">
        <div className="featuredContent">
          <Link to={`/literature/a/${authorKeys[creatorFrequency]}`} className="featuredBlock">
            <h4 className="featureDescription">Featured Author: </h4>
            <h2>{decodeURIComponent(`${author.fname} ${author.lname}`)}</h2>
          </Link>
          <Link to={`/literature/a/${authorKeys[creatorFrequency]}/${lit.genre}/${lit.fileName}`} className="featuredBlock">
            <img
              className="artPickThumb"
              src={`./content/images/book.gif`}
              alt="lit pick" />
            <h4 className="featureDescription">Today's lit pick: </h4>
            <h2>{lit.title}</h2>
          </Link>
        </div>
        <div className="featuredContent">
          <Link to={`/arts/a/${artistKeys[creatorFrequency]}`} className="featuredBlock">
            <h4 className="featureDescription">Featured Artist: </h4>
            <h2>{decodeURIComponent(`${artist.fname} ${artist.lname}`)}</h2>
          </Link>
          <Link to={`/arts/a/${artistKeys[creatorFrequency]}/${artist.era}/${art.fileName}`} className="featuredBlock">
            <img
              className="artPickThumb"
              src={`./content/artwork/${artistKeys[creatorFrequency]}/${art.fileName}_sm.jpg`}
              alt={art.title} />
            <h4 className="featureDescription">Today's art pick: </h4>
            <h2>{art.title}</h2>
          </Link>
        </div>
      </div>
    )
  })();

  return (
    <div className="homeView">
      <div className="section">
        <div className="homeDescription">Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.</div>
      </div>
      <div className="section">
        {featuredContent}
      </div>
    </div>
  );
}

export default HomeView;
