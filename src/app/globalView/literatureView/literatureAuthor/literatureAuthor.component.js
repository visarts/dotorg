import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureAuthor.component.less';

const LiteratureAuthor = (props) => {
  document.querySelector('body').scrollTop = 0;

  const authorKey = props.match.params.author;
  const author = props.store.authorsData[authorKey];
  //openTitle = openTitle.bind(this);
  document.title = `Portitude Library: ${author.fname} ${author.lname}`;


  const openTitle = (title) => {
    //historyService.addToHistory({type: 'litHistory', data: title})
  };



  const getTitles = () => {
    let genres = {
      shorts: [],
      poetry: [],
      nonfiction: [],
      fables: [],
      tales: []
    };
    author.content.map((title, index) => {
      //title.author = author;
      let pageIndicator = title.genre === 'poetry' ? `${author.lname}, ` : title.pageSizes.length === 1 ? '1 page, ' : title.pageSizes.length + ' pages, ';
      let titleLink = (
        <ListLink
          key={title.fileName}
          url={`/literature/a/${authorKey}/${title.genre}/${title.fileName}`}
          action={openTitle.bind(this, title)}
          text={title.title}
          other={`${pageIndicator}${title.date}`} />);
      switch(title.genre) {
        case 'shorts':
          genres.shorts.push(titleLink);
          break;
        case 'poetry':
          genres.poetry.push(titleLink);
          break;
        case 'nonfiction':
          genres.nonfiction.push(titleLink);
          break;
        case 'fables':
          genres.fables.push(titleLink);
          break;
        case 'tales':
          genres.tales.push(titleLink);
          break;
      }
    });
    return genres;
  };

  const titles = getTitles();
  const loadDefaultProfileImage = (event) => {
    event.target.src='./content/portraits/profile.jpg';
  };

  //const percentage = JSON.parse(localStorage.getItem('readtest')).percentage;
  //console.log(percentage);
  {/*<div className="about">
    <div className="authorPic">
      <img src={`./content/portraits/authors/${authorKey}.jpg`} onError={loadDefaultProfileImage} />
    </div>
  </div>*/}

  {/*<div style={{height: '7px', width: '25px', background: `linear-gradient(to right, #38e02c 0%, #38e02c 50%, black 50%)`}}></div>*/}
  return (
    <div className="literatureAuthor">
      <h1 className="literatureAuthorTitle"><span className="fname">{decodeURIComponent(`${author.fname} `)}</span><span className="lname">{decodeURIComponent(author.lname)}</span></h1>
      <div className="literatureAuthorBio">{ author.bio }</div>
      <div className="titlesContainer">
        {titles.shorts[0] && <div className="genreContainer">
          <h2>Short Stories</h2>
          <ul className="titles">{ titles.shorts }</ul>
        </div>}
        {titles.poetry[0] && <div className="genreContainer">
          <h2>Poetry</h2>
          <ul className="titles">{ titles.poetry }</ul>
        </div>}
        {titles.nonfiction[0] && <div className="genreContainer">
          <h2>Nonfiction</h2>
          <ul className="titles">{ titles.nonfiction }</ul>
        </div>}
        {titles.fables[0] && <div className="genreContainer">
          <h2>Fables</h2>
          <ul className="titles">{ titles.fables }</ul>
        </div>}
        {titles.tales[0] && <div className="genreContainer">
          <h2>Fairy Tales</h2>
          <ul className="titles">{ titles.tales }</ul>
          {/*<div className="titlesFadeOut"></div>*/}
        </div>}
        <BackToTop />
      </div>
    </div>
  );
}

export default LiteratureAuthor;
