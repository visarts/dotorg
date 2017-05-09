const getAuthorData = (author) => {
  const authorData = require(`authors/${author}.json`);
  return authorData;
};

const getAuthorsData = () => {
  const authorsData = require('authors.json');
  return authorsData;
}
const getArtistData = (artist) => {
  const artistData = require(`artists/${artist}.json`);
  return artistData;
};

const getArtistNames = () => {
  const namesData = require('names.json');
  return namesData.artists;
};

const getAuthorNames = () => {
  const namesData = require('names.json');
  return namesData.authors;
};

const dataService = {
  getAuthorData,
  getAuthorsData,
  getArtistData,
  getArtistNames,
  getAuthorNames
}

export default dataService;
