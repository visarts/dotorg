import React from 'react';
import { Link } from 'react-router-dom';

import LiteratureHistory from 'SharedComponents/literatureHistory/literatureHistory.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureHome.component.less';

const LiteratureHome = (props) => {

  document.querySelector('body').scrollTop = 0;
  document.title = 'Portitude Library';

  const authorsList = [];

  for(let index in props.store.authorsData) {
    let author = props.store.authorsData[index];
    authorsList.push(
      <ListLink
        key={index}
        url={`literature/a/${index}`}
        text={`${author.fname} ${author.lname} (${author.content.length})`} />
    );
  }



  return (
    <div className="literatureHome">
      <h1>Welcome to the Portitude Library</h1>
      <h3>Classic literature lines the dusty shelves. Make yourself right at home.</h3>
      <LiteratureHistory />
      <div className="titlesContainer">
        <h3>The Authors</h3>
        <ul className="authorsList">{authorsList}</ul>
      </div>
      <div className="titlesContainer">
        <h3>The Genres</h3>
        <ul className="genresList">
          <ListLink url={`literature/g/shorts`} text="Short Stories" />
          <ListLink url={`literature/g/poetry`} text="Poetry" />
          <ListLink url={`literature/g/nonfiction`} text="Nonfiction" />
          <ListLink url={`literature/g/fables`} text="Fables" />
          <ListLink url={`literature/g/tales`} text="Tales" />
        </ul>
      </div>
    </div>
  )
}

export default LiteratureHome;
