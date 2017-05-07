const getAuthorData = (author) => {
  const authorData = require(`../../../data/authors/${author}.json`);
  console.log(author);
  return authorData;
}

const getArtistData = (artist) => {
  const artistData = require(`../../../data/artists/${artist}.json`);
  return artistData;
}

export {getAuthorData, getArtistData};
