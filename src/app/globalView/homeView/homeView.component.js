import React from 'react';
import { Link } from 'react-router-dom';
import './homeView.component.less';

const HomeView = (props) => {

  document.querySelector('body').scrollTop = 0;
  const authorKeys = Object.keys(props.store.authorsData);
  const artistKeys = Object.keys(props.store.artistsData);
  const date = new Date();
  const creatorFrequency = date.getDay();
  const contentFrequency = date.getMonth();
  const author = props.store.authorsData[authorKeys[creatorFrequency]];
  const artist = props.store.artistsData[artistKeys[creatorFrequency]];
  const lit = author.content[contentFrequency] ? author.content[contentFrequency] : author.content[0];
  const art = artist.content[contentFrequency] ? artist.content[contentFrequency] : artist.content[0];

  const featuredContent = (() => {
    return (
      <div className="featured">
        <div className="featuredContent">
          <div className="featuredBlock">
            <h4>Featured Author: </h4>
            <h2>
              <Link to={`literature/authors/${authorKeys[creatorFrequency]}`}>{author.fname} {author.lname}</Link>
            </h2>
          </div>
          <div className="featuredBlock">
            <h4>TocreatorFrequency's lit pick: </h4>
            <h2>
              <Link to={`/literature/authors/${authorKeys[creatorFrequency]}/${lit.fileName}`}>{lit.title}</Link>
            </h2>
          </div>
        </div>
        <div className="featuredContent">
          <div className="featuredBlock">
            <h4>Featured Artist: </h4>
            <h2>
              <Link to={`arts/artists/${artistKeys[creatorFrequency]}`}>{artist.fname} {artist.lname}</Link>
            </h2>
          </div>
          <div className="featuredBlock">
            <h4>TocreatorFrequency's art pick: </h4>
            <h2>
              <Link to={`/arts/artists/${artistKeys[creatorFrequency]}/${art.fileName}`}>{art.title}</Link>
            </h2>
          </div>
        </div>
      </div>
    )
  })();

  return (
    <div className="homeView">
      <div className="section">
        Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.
      </div>
      <div className="section">
        {featuredContent}
      </div>
    </div>
  );
}

export default HomeView;
