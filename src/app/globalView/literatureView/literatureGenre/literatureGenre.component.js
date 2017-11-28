import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureGenre.component.less';


const LiteratureGenre = (props) => {

  document.title = `Portitude Library: ${props.appState.routing.currentSubSection}`;

  const getTitles = () => {
    let authorsList = [];
    for(let authorKey in props.store.literature) {
      let titlesList = [];
      let author = props.store.literature[authorKey];
      for (let i in author.content) {
        let title = author.content[i];
        let pageIndicator = title.genre === 'poetry' ? `${author.lname}, ` : title.pageSizes.length === 1 ? '1 page, ' : title.pageSizes.length + ' pages, '
        if (title.genre === props.appState.routing.currentSubSection) {
          titlesList.push(
            <ListLink
              key={title.fileName}
              url={`/literature/g/${title.genre}/${authorKey}/${title.fileName}`}
              text={title.title}
              other={`${pageIndicator}${title.date}`} />
          );
        }
      }
      if (titlesList.length) {
        authorsList.push(
          <div className="authorBlock" key={authorKey}>
            <SectionHeader text={`${author.fname} ${author.lname}`} />
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
      <h1>{props.appState.routing.currentSubSection}</h1>
      <div>The best parts of waking up is {props.appState.routing.currentSubSection} in your browser</div>
      <div className="genreContainer">
        {titles}
      </div>
      <BackToTop />
    </div>
  )
};

export default LiteratureGenre;
