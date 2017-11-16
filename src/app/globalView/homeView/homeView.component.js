import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './homeView.component.less';

const HomeView = (props) => {

  const authorKeys = dataService.getAuthorNames();
  const artistKeys = dataService.getArtistNames();
  const date = new Date();
  const creatorFrequency = date.getMonth();
  const contentFrequency = date.getDate();
  const monthName = date.toLocaleString('en-us', { month: 'long' });
  const author = props.store.authorsData[authorKeys[creatorFrequency]];
  const artist = props.store.artistsData[artistKeys[creatorFrequency]];
  const lit = author.content[contentFrequency] ? author.content[contentFrequency] : author.content[author.content.length - 1];
  const art = artist.content[contentFrequency] ? artist.content[contentFrequency] : artist.content[author.content.length - 1];

  // the following is duplicated from listLink
  const limitText = (text) => {
    let limitedText = '';
    let smallScreen = 768;
    let textLimit = window.innerWidth >= smallScreen ? 100 : 75;
    if (text) {
      if (text.length > textLimit) {
        limitedText = text.substring(0, textLimit);
        limitedText = limitedText.substring(0, limitedText.lastIndexOf(' ')).concat('...');
      } else {
        limitedText = text;
      }
    }
    return limitedText;
  }

  const featuredContent = (() => {
    return (
      <div className="featured">
        <div className="featuredContent">
          <Link to={`/literature/a/${authorKeys[creatorFrequency]}`} className="featuredBlock">
            <h4 className="featureDescription"><em>{monthName}'s</em> Featured Author: </h4>
            <h2>{`${author.fname} ${author.lname}`}</h2>
            <div className="featuredSubtext">{limitText(author.bio)}</div>
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
            <h4 className="featureDescription"><em>{monthName}'s</em> Featured Artist: </h4>
            <h2>{`${artist.fname} ${artist.lname}`}</h2>
            <div className="featuredSubtext">{limitText(artist.bio)}</div>
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
        <h1>Welcome Home</h1>
        <div className="homeDescription">Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.</div>
      </div>
      <div className="section">
        {featuredContent}
      </div>
    </div>
  );
}

export default HomeView;
