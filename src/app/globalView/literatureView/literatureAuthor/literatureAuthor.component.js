import React from 'react';
import { Route, Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import LiteratureDisplay from '../literatureDisplay/literatureDisplay.component';
import './literatureAuthor.component.less';


const LiteratureAuthor = (props) => {
  //document.querySelector('body').scrollTop = 0;
  const author = props.currentAuthor;
  const authorData = dataService.getAuthorData(author.authorKey);
  const titles = authorData.content.map((title, index) => {
    return (
      <li key={index}>
        {props.location.pathname !== `/literature/${author.authorKey}/${title.fileName}` ?
          <Link to={`/literature/${author.authorKey}/${title.fileName}`}>{decodeURIComponent(title.title)}</Link> :
          <a href="#" className="selected">{title.title}</a>
        }
      </li>
    );
  });

  return (
    <div className="literatureAuthor">
      <h1>{`${author.fname} ${author.lname}`}</h1>
      <div className="authorPic">
        <img src="./images/andersenhc.jpg" />
      </div>
      <div className="bio">{author.bio}</div>
      <ul className="titles">{ titles }</ul>
      <div className="titlesFadeOut"></div>
      <div className="backToTop"></div>
    </div>
  );
}

export default LiteratureAuthor;
