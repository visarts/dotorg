import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './home.component.less';

const Home = (props) => {

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const featuredContent = (() => {
    let author = props.authorsData[day];
    let authorData = dataService.getAuthorData(author.authorKey);
    let lit = authorData.content[month] ? authorData.content[month] : authorData.content[0];
    return (
      <div>
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
      <div className="section">
        <h1>Portitude Arts and Literature</h1>
        Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.
      </div>
      <div className="section">
        {featuredContent}
      </div>
    </div>
  );
}

export default Home;
