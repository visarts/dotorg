const jsonConcat = require('json-concat');

const mergingService = () => {
  jsonConcat({src: 'data/authors/', dest: 'data/allAuthors.json'}, () => {return;})
  jsonConcat({src: 'data/artists/', dest: 'data/allArtists.json'}, () => {return;})
};

mergingService();
