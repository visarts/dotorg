const getAuthorData = (author) => {
  const authorData = require(`../../../data/authors/${author}.json`);
  return authorData;
};

const getAuthorsData = () => {
  const authorsData = require('../../../data/authors.json');
  return authorsData;
}
const getArtistData = (artist) => {
  const artistData = require(`../../../data/artists/${artist}.json`);
  return artistData;
};

const getArtistNames = () => {
  const namesData = require('../../../data/names.json');
  return namesData.artists;
};

const getAuthorNames = () => {
  const namesData = require('../../../data/names.json');
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
