import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './home.component.less';

const Home = (props) => {

  document.querySelector('body').scrollTop = 0;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const author = props.authorsData[day];
  const authorData = dataService.getAuthorData(author.authorKey);
  const lit = authorData.content[month] ? authorData.content[month] : authorData.content[0];
  const featuredContent = (() => {
    return (
      <div className="featuredContent">
        <div className="featuredBlock">
          <h4>Featured Author: </h4>
          <h2>
            <Link to={`literature/${author.authorKey}`}>{author.fname} {author.lname}</Link>
          </h2>
        </div>
        <div className="featuredBlock">
          <h4>Today's lit pick: </h4>
          <h2>
            <Link to={`/literature/${author.authorKey}/${lit.fileName}`}>{lit.title}</Link>
          </h2>
        </div>
      </div>
    )
  })();

  return (
    <div className="homeComponent">
      <div className="globalContainer">
        <div className="section">
          
          Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.
        </div>
        <div className="section">
          {featuredContent}
        </div>
      </div>
    </div>
  );
}

export default Home;
