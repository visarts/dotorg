import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './homeView.component.less';

const HomeView = (props) => {

  document.querySelector('body').scrollTop = 0;
  const dailynum = localStorage.getItem('dailynum') ? parseInt(JSON.parse(localStorage.getItem('dailynum'))) : 0;
  const num = dailynum && dailynum < props.authorsData.length ? dailynum : 0;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const author = props.authorsData[month];
  const authorData = dataService.getAuthorData(author.creatorKey);
  const lit = authorData.content[num] ? authorData.content[num] : authorData.content[0];

  localStorage.setItem('dailynum', JSON.stringify(num))

  const featuredContent = (() => {
    return (
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
