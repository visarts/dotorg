import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureGenre.component.less';


const LiteratureGenre = (props) => {

  const getTitles = () => {
    let authorsList = [];
    for(let authorKey in props.store.authorsData) {
      let titlesList = [];
      let author = props.store.authorsData[authorKey];
      for (let i in author.content) {
        let title = author.content[i];
        if (title.genre === props.appState.routing.currentCreator) {
          titlesList.push(
            <ListLink
              key={title.fileName}
              url={`/literature/authors/${authorKey}/${title.fileName}`}
              text={title.title} />
          );
        }
      }
      if (titlesList.length) {
        authorsList.push(
          <div className="authorBlock" key={authorKey}>
            <h3>{author.fname} {author.lname}</h3>
            <ul className="contentBlock">
              {titlesList}
            </ul>
          </div>
        );
      }
    }
    return authorsList;
  }

  const titles = getTitles();

  return (
    <div className="literatureGenre">
      <h1>{props.appState.routing.currentCreator}</h1>
      <h2>The best parts of waking up is {props.appState.routing.currentCreator} in your browser</h2>
      <div className="genreContainer">
        {titles}
      </div>
    </div>
  )
};

export default LiteratureGenre;
