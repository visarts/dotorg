import axios from 'axios';

const getAuthorData = (author) => {
  const authorData = require(`authors/${author}.json`);
  return authorData;
};

const getAuthorsData = () => {
  const authorsData = require('authors.json');
  return authorsData.authors;
}
const getArtistData = (artist) => {
  const artistData = require(`artists/${artist}.json`);
  return artistData;
};

const getArtistsData = () => {
  const artistsData = require('artists.json');
  return artistsData.artists;
}

const getArtistNames = () => {
  const namesData = require('creatorKeys.json');
  return namesData.artists;
};

const getAuthorNames = () => {
  const namesData = require('creatorKeys.json');
  return namesData.authors;
};

const getAllAuthorsData = () => {
  return axios.get('./data/allAuthors.json')
    .then((results) => {
      return results.data;
    });
};

const getAllArtistsData = () => {
  return axios.get('./data/allArtists.json')
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

const getCurrentRouting = (currentRoute) => {
  let params = currentRoute.slice(1).split('/');
  let mappedParams = {
    currentSection: params[0] || '',
    currentSubSection: params[1] ? params[1] : '',
    currentCreator: params[2] ? params[2] : '',
    currentWork: params[3] ? params[3] : '',
    isSpecial: params[1] && params[1] === 'genres' ? true : false
  };
  return mappedParams;
};

const dataService = {
  getAuthorData,
  getAuthorsData,
  getAuthorNames,
  getArtistData,
  getArtistsData,
  getArtistNames,
  getAllAuthorsData,
  getAllArtistsData,
  getHTMLContent,
  getCurrentRouting
}

export default dataService;
