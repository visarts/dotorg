import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import historyService from 'Services/history.service';
import LiteratureDisplay from '../literatureDisplay/literatureDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureAuthor.component.less';

const LiteratureAuthor = (props) => {
  //document.querySelector('body').scrollTop = 0;

  const author = props.store.currentCreator;
  //openTitle = openTitle.bind(this);

  const openTitle = (title) => {
    //historyService.addToHistory({type: 'litHistory', data: title})
  };

  const getTitles = (author) => {
    return author.content.map((title, index) => {
      title.author = author;
      return (
        <ListLink
          key={title.fileName}
          url={`/literature/${author.creatorKey}/${title.fileName}`}
          action={openTitle.bind(this, title)}
          text={title.title} />
      );
    });
  };

  const titles = getTitles(author);




  const loadDefaultProfileImage = (event) => {
    event.target.src='./content/portraits/profile.jpg';
  };

  return (
    <div className="literatureAuthor">
      <h1>{`${author.fname} ${author.lname}`}</h1>
      <div className="about">
        <div className="authorPic">
          <img src={`./content/portraits/authors/${author.creatorKey}.jpg`} onError={loadDefaultProfileImage} />
        </div>
        <div className="bio">{author.bio}<div className="readMoreLink"><a href="#" target="_blank">Read More <Glyphicon glyph="new-window" /></a></div></div>
      </div>
      <div className="titlesContainer">
        <div className="titlesTitle"><h3>Explore the library</h3></div>
        <ul className="titles">{ titles }</ul>
        <div className="titlesFadeOut"></div>
        <BackToTop />
      </div>
      <Route path='/literature/:author/:work' render={routeProps => (
        <LiteratureDisplay
          store={props.store}
          {...routeProps} />
      )} />
    </div>
  );
}

export default LiteratureAuthor;
