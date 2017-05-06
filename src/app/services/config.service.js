import axios from 'axios';
import authors from '../../../data/authors.json';
import artists from '../../../data/artists.json';

const getAuthors = () => {
  return authors.authors;
}

const getArtists = () => {
  return artists.artists;
}

export {getAuthors, getArtists};
