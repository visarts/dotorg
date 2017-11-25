import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './searchView.component.less';

const SearchView = (props) => {

  // will need grab all content json files and walk through every item to look for a match of item title

  const searchInput = props.appState.searchInput ? props.appState.searchInput : '';
  const artistNames = dataService.getArtistNames();
  const authorNames = dataService.getAuthorNames();
  //const isArtist = false;
  //const isAuthor = false;
  const artistList = [];
  const authorList = [];
  for (let i in artistNames) {
    if (artistNames[i].indexOf(searchInput) > -1) {
      artistList.push(artistNames[i]);
    }
  }
  for (let i in authorNames) {
    if (authorNames[i].indexOf(searchInput) > -1) {
      authorList.push(authorNames[i]);
    }
  }


  /*const sectionType = isArtist ? 'arts' : 'literature';
  const nameKey = isArtist ? artistNames[artistNames.indexOf(searchInput)] : isAuthor ? authorNames[authorNames.indexOf(searchInput)] : false;
  let creator = '';
  let works = '';
  if (nameKey) {
    let dataType = isArtist ? 'artistsData' : 'authorsData';
    let keyType = isArtist ? 'creatorKey' : 'creatorKey';
    creator = props[dataType].filter((item, index) => {
      return item[keyType] === nameKey ? item : false;
    });

  }*/

  const getAuthorsList = authorList.length ? authorList.map((nameKey, index) => {
    return (
      <li key={index}>
        <Link to={`literature/authors/${nameKey}`} onClick={() => {props.updateAppState({searchInput: nameKey})}} key={index}>{nameKey}</Link>
      </li>
    );
  }) : null;

  const getArtistsList = artistList.length ? artistList.map((nameKey, index) => {
    return (
      <li key={index}>
        <Link to={`arts/artists/${nameKey}`} onClick={() => {props.updateAppState({searchInput: nameKey})}} key={index}>{nameKey}</Link>
      </li>
    );
  }) : null;

  return (
    <div className="searchView">
      <h1>Results for &quot;{searchInput}&quot;</h1>
      {authorList.length > 0 &&
        <div className="searchResults">
          <h3>Authors</h3>
          <ul className="authorSearchList">
            {getAuthorsList}
          </ul>
        </div>}
      {artistList.length > 0 &&
        <div className="searchResults">
          <h3>Artists</h3>
          <ul className="artistSearchList">
            {getArtistsList}
          </ul>
        </div>}
    </div>
  );
}

export default SearchView;
