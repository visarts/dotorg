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
}

const getAllArtistsData = () => {
  return axios.get('./data/allArtists.json')
    .then((results) => {
      return results.data;
    });
}

const getHTMLContent = (creatorKey, currentWorkKey) => {
  return axios.get(`./content/literature/${creatorKey}/${currentWorkKey}.html`)
    .then((results) => {
      return results.data;
    });
}

const dataService = {
  getAuthorData,
  getAuthorsData,
  getAuthorNames,
  getArtistData,
  getArtistsData,
  getArtistNames,
  getAllAuthorsData,
  getAllArtistsData,
  getHTMLContent
}

export default dataService;
