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
  const namesData = require('names.json');
  return namesData.artists;
};

const getAuthorNames = () => {
  const namesData = require('names.json');
  return namesData.authors;
};

const getHTMLContent = (authorKey, currentWorkKey) => {
  return axios.get(`./content/literature/${authorKey}/${currentWorkKey}.html`)
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
  getHTMLContent
}

export default dataService;
