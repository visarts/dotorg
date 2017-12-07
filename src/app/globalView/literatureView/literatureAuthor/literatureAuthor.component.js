import { Glyphicon } from 'react-bootstrap';
import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import './literatureAuthor.component.scss';

const LiteratureAuthor = (props) => {

  const authorKey = props.match.params.author;
  const author = props.store.literature[authorKey];
  document.title = `Portitude Library: ${author.fname} ${author.lname}`;

  const getTitles = () => {
    const genres = {
      shorts: [],
      poetry: [],
      nonfiction: [],
      fables: [],
      tales: []
    };
    author.content.map((title, index) => {
      const pageIndicator = title.genre === 'poetry' ? `${author.lname}, ` : title.pageSizes.length === 1 ? '1 page, ' : `${title.pageSizes.length} pages, `;
      const titleLink = (
        <ListLink
          key={title.fileName}
          url={`/literature/a/${authorKey}/${title.genre}/${title.fileName}`}
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
      <h1 className="literatureAuthorTitle"><span className="fname">{`${author.fname} `}</span><span className="lname">{author.lname}</span></h1>
      <div className="literatureAuthorBio">{ author.bio }</div>
      <div className="titlesContainer">
        {titles.shorts[0] && <div className="genreContainer">
          <SectionHeader text="Short Stories" />
          <ul className="titles">{ titles.shorts }</ul>
        </div>}
        {titles.poetry[0] && <div className="genreContainer">
          <SectionHeader text="Poetry" />
          <ul className="titles">{ titles.poetry }</ul>
        </div>}
        {titles.nonfiction[0] && <div className="genreContainer">
          <SectionHeader text="Nonfiction" />
          <ul className="titles">{ titles.nonfiction }</ul>
        </div>}
        {titles.fables[0] && <div className="genreContainer">
          <SectionHeader text="Fables" />
          <ul className="titles">{ titles.fables }</ul>
        </div>}
        {titles.tales[0] && <div className="genreContainer">
          <SectionHeader text="Fairy Tales" />
          <ul className="titles">{ titles.tales }</ul>
          {/*<div className="titlesFadeOut"></div>*/}
        </div>}
        <BackToTop />
      </div>
    </div>
  );
};

export default LiteratureAuthor;
