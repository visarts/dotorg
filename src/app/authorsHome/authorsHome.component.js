import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './authorsHome.component.less';


const AuthorsHome = (props) => {
  const author = props.currentAuthor;
  const authorData = dataService.getAuthorData(author.authorKey);
  const titles = authorData.content.map((title, index) => {
    return (
      <li key={index}>
        {props.location.pathname !== `/literature/${author.authorKey}/${title.fileName}` ?
          <Link to={`/literature/${author.authorKey}/${title.fileName}`}>{decodeURIComponent(title.title)}</Link> :
          <span className="selected">{title.title}</span>
        }
      </li>
    );
  });

  return (
    <div className="authorsHome">
      <div className="section">
        <h1>{`${author.fname} ${author.lname}`}</h1>
        <div>{author.bio}</div>
        <ul>{ titles }</ul>
      </div>
    </div>
  );
}

export default AuthorsHome;
