import axios from 'axios';

/*const getAuthorData = (author) => {
  const authorData = require(`authors/${author}.json`);
  return authorData;
};*/

/*const getAuthorsData = () => {
  const authorsData = require('authors.json');
  return authorsData.authors;
};*/

/*const getArtistData = (artist) => {
  const artistData = require(`artists/${artist}.json`);
  return artistData;
};*/

/*const getArtistsData = () => {
  const artistsData = require('artists.json');
  return artistsData.artists;
};*/

/*const getArtistNames = () => {
  const namesData = require('creatorKeys.json');
  return namesData.artists;
};

const getAuthorNames = () => {
  const namesData = require('creatorKeys.json');
  return namesData.authors;
};

const getAllLiterature = () => {
  return axios.get('./data/allAuthors.json')
    .then((results) => {
      return results.data;
    });
};

const getAllArtwork = () => {
  return axios.get('./data/allArtists.json')
    .then((results) => {
      return results.data;
    });
};*/

const getCollections = (type) => {
  return axios.get(`./data/${type}-collections.json`)
    .then((results) => {
      return results.data;
    });
};

const getItems = (type) => {
  return axios.get(`./data/${type}-items.json`)
    .then((results) => {
      return results.data;
    });
};

const getHTMLContent = (creatorKey, currentWorkKey) => {
  return axios.get(`./content/literature/${creatorKey}/${currentWorkKey}.html`)
    .then((results) => {
      return results.data;
    });
};

/*const getCurrentRouting = (currentRoute) => {
  let params = currentRoute.slice(1).split('/');
  let mappedParams = {
    currentSection: params[0] || '',
    currentSubSection: params[1] ? params[1] : '',
    currentCreator: params[2] ? params[2] : '',
    currentWork: params[3] ? params[3] : '',
    isSpecial: params[1] && params[1] === 'genres' ? true : false
  };
  return mappedParams;
};*/

/*
DOTORG routing

Section:		  Key:		Label1:		Label2:			       Label3:
                                (requires label3)
[0			       1		  2			    3				           4		    ]
/literature		/a		  /:author	/:genre			       /:workTitle
			        /g		  /:genre		/:author		       /:workTitle

/arts			    /a		  /:artist	/:style			       /:workTitle
			        /g		  /:style		/:artist           /:workTitle

/search


Section:
/literature

Author:
/literature/a/kipling

Genre:
/literature/g/shorts

Work from author:

/literature/a/kipling/shorts/kipling-short-name-1899

Work from genre:

/literature/g/shorts/kipling/kipling-short-name-1899

*/
const getCurrentRouting = (currentRoute) => {
  const params = currentRoute.slice(1).split('/');
  const mappedParams = {
    currentSection: params[0] || '',
    currentSubSection: params[1] && params[1] === 'a' && params[3] ? params[3] : params[1] && params[1] === 'g' && params[2] ? params[2] : '',
    currentCreator: params[1] && params[1] === 'a' && params[2] ? params[2] : params[1] && params[1] === 'g' && params[3] ? params[3] : '',
    currentWork: params[4] ? params[4] : '',
    routeKey: params[1] ? params[1] : ''
  };
  return mappedParams;
};

const dataService = {
  //getAuthorNames,
  //getArtistNames,
  //getAllLiterature,
  //getAllArtwork,
  getCollections,
  getItems,
  getHTMLContent,
  getCurrentRouting
};

export default dataService;
