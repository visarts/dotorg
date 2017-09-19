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
        text={`${author.fname} ${author.lname}`}
        other={`${author.bio}`} />
    );
  }



  return (
    <div className="literatureHome">
      <h1>Welcome to the Portitude Library</h1>
      <div className="homeDescription">Classic literature lines the dusty shelves. Make yourself right at home.</div>
      <LiteratureHistory />
      <div className="titlesContainer">
        <h2>The Genres</h2>
        <ul className="genresList">
          <ListLink url={`literature/g/shorts`} text="Short Stories" inlined={true} />
          <ListLink url={`literature/g/poetry`} text="Poetry" inlined={true} />
          <ListLink url={`literature/g/nonfiction`} text="Nonfiction" inlined={true} />
          <ListLink url={`literature/g/fables`} text="Fables" inlined={true} />
          <ListLink url={`literature/g/tales`} text="Tales" inlined={true} />
        </ul>
      </div>
      <div className="titlesContainer">
        <h2>The Authors</h2>
        <ul className="authorsList">{authorsList}</ul>
      </div>
    </div>
  )
}

export default LiteratureHome;
