import React from 'react';
import { Link } from 'react-router-dom';
import dataService from 'Services/data.service';
import './searchHome.component';

const SearchHome = (props) => {
  // prevent a page refresh from clearing the search
  sessionStorage.setItem('searchInput', props.searchInput ? props.searchInput : sessionStorage.getItem('searchInput'));

  // will need grab all content json files and walk through every item to look for a match of item title
  // try out https://github.com/cure53/DOMPurify for sanitizing search input

  const searchInput = sessionStorage.getItem('searchInput');
  const artistNames = dataService.getArtistNames();
  const authorNames = dataService.getAuthorNames();
  const isArtist = artistNames.indexOf(searchInput) > -1;
  const isAuthor = authorNames.indexOf(searchInput) > -1;
  const sectionType = isArtist ? 'arts' : 'literature';
  const nameKey = isArtist ? artistNames[artistNames.indexOf(searchInput)] : isAuthor ? authorNames[authorNames.indexOf(searchInput)] : false;
  let creator = '';
  let works = '';
  if (nameKey) {
    let dataType = isArtist ? 'artistsData' : 'authorsData';
    let keyType = isArtist ? 'artistKey' : 'authorKey';
    creator = props[dataType].filter((item, index) => {
      return item[keyType] === nameKey ? item : false;
    });

  }

  return (
    <div className="searchHome">
      <div className="section">
        <h1>Results for &quot;{searchInput}&quot;</h1>
        <div className="searchResults">
          { nameKey &&
            <Link to={`${sectionType}/${nameKey}`}>{creator[0].fname} {creator[0].lname}</Link>}
        </div>
      </div>
    </div>
  );
}

export default SearchHome;
