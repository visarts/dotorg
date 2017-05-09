import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './authorsHome.component.less';


const AuthorsHome = (props) => {
  const author = props.match.params.author;
  const authorData = dataService.getAuthorData(author);console.log(props);
  const titles = authorData.content.map((item, index) => {
    return (
      <li key={index}>
        {props.location.pathname !== `/literature/${author}/${item.fileName}` ? <Link to={`${author}/${item.fileName}`}>{item.title}</Link> : <span>{item.title}</span>}
      </li>
    );
  });

  return (
    <div className="authorsHome">
      <div className="section">
        <h1>{`${authorData.fname} ${authorData.lname}`}</h1>
        <div>Anyone lived in a pretty how town with up so floating many bells down.</div>
        <ul>{ titles }</ul>
      </div>
    </div>
  );
}

export default AuthorsHome;
