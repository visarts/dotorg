import { Link } from 'react-router-dom';

import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import LiteratureHistory from 'SharedComponents/literatureHistory/literatureHistory.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureHome.component.scss';

const LiteratureHome = (props) => {

  document.title = 'Portitude Library';

  const authorsList = [];

  for(const index in props.store.literature) {
    const author = props.store.literature[index];
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
        <SectionHeader text="The Genres" />
        <ul className="genresList">
          <ListLink url={`literature/g/shorts`} text="Short Stories" inlined />
          <ListLink url={`literature/g/poetry`} text="Poetry" inlined />
          <ListLink url={`literature/g/nonfiction`} text="Nonfiction" inlined />
          <ListLink url={`literature/g/fables`} text="Fables" inlined />
          <ListLink url={`literature/g/tales`} text="Tales" inlined />
        </ul>
      </div>
      <div className="titlesContainer">
        <SectionHeader text="The Authors" />
        <ul className="authorsList">{authorsList}</ul>
      </div>
    </div>
  );
};

export default LiteratureHome;
