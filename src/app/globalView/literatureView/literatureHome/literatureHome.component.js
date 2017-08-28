import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';

import LiteratureHistory from 'SharedComponents/literatureHistory/literatureHistory.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureHome.component.less';

const LiteratureHome = (props) => {

  document.querySelector('body').scrollTop = 0;

  const authorsList = [];

  for(let index in props.store.authorsData) {
    let author = props.store.authorsData[index];
    authorsList.push(
      <ListLink
        key={index}
        url={`/literature/authors/${index}`}
        text={`${author.fname} ${author.lname} (${author.content.length})`} />
    );
  }



  return (
    <div className="literatureHome">
      <h1>Welcome to the Portitude Library</h1>
      <h3>Classic literature lines the dusty shelves. Make yourself right at home.</h3>
      <LiteratureHistory />
      <ul className="authorsList">{authorsList}</ul>
      <ul className="genresList">
        <ListLink url={`literature/genres/shorts`} text="Short Stories" />
        <ListLink url={`literature/genres/poetry`} text="Poetry" />
        <ListLink url={`literature/genres/nonfiction`} text="Nonfiction" />
        <ListLink url={`literature/genres/fables`} text="Fables" />
        <ListLink url={`literature/genres/tales`} text="Tales" />
      </ul>
    </div>
  )
}

export default LiteratureHome;
