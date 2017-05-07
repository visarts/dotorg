import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthorData } from 'Services/data.service';
import './authorsHome.component.less';


const AuthorsHome = (props) => {
  const author = props.match.params.author;
  const authorData = getAuthorData(author);
  const titles = authorData.content.map((item, index) => {
    return (
      <ul key={index}>
        <li key={index}>
          <Link to={`${author}/${item.fileName}`}>{item.title}</Link>
        </li>
      </ul>
    );
  });

  return (
    <div className="authorsHome">
      <div className="section">
        <h1>{`${authorData.fname} ${authorData.lname}`}</h1>
        <div>Anyone lived in a pretty how town with up so floating many bells down.</div>
        <div>{ titles }</div>
      </div>
    </div>
  );
}

export default AuthorsHome;
