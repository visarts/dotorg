import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './homeView.component.less';

const HomeView = (props) => {

  document.querySelector('body').scrollTop = 0;
  const dailynum = localStorage.getItem('dailynum') ? parseInt(JSON.parse(localStorage.getItem('dailynum'))) : -1;
  let num = dailynum && dailynum < props.store.authorsData.length ? dailynum : -1;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const author = props.store.authorsData[month];
  const artist = props.store.artistsData[month];
  const authorData = dataService.getAuthorData(author.creatorKey);
  const artistData = dataService.getArtistData(artist.creatorKey);
  const lit = authorData.content[num] ? authorData.content[num] : authorData.content[0];
  const art = artistData.content[num] ? artistData.content[num] : artistData.content[0];

  if (num < props.store.authorsData.length) {
    num = num + 1;
  }

  localStorage.setItem('dailynum', JSON.stringify(num))

  const featuredContent = (() => {
    return (
      <div className="featured">
        <div className="featuredContent">
          <div className="featuredBlock">
            <h4>Featured Author: </h4>
            <h2>
              <Link to={`literature/${author.creatorKey}`}>{author.fname} {author.lname}</Link>
            </h2>
          </div>
          <div className="featuredBlock">
            <h4>Today's lit pick: </h4>
            <h2>
              <Link to={`/literature/${author.creatorKey}/${lit.fileName}`}>{lit.title}</Link>
            </h2>
          </div>
        </div>
        <div className="featuredContent">
          <div className="featuredBlock">
            <h4>Featured Artist: </h4>
            <h2>
              <Link to={`arts/${artist.creatorKey}`}>{artist.fname} {artist.lname}</Link>
            </h2>
          </div>
          <div className="featuredBlock">
            <h4>Today's art pick: </h4>
            <h2>
              <Link to={`/arts/${artist.creatorKey}/${art.fileName}`}>{art.title}</Link>
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
