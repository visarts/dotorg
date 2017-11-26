const jsonConcat = require('json-concat');

const mergingService = () => {
  jsonConcat({src: 'data/authors/', dest: 'data/compiled/allAuthors.json'}, () => {return;})
  jsonConcat({src: 'data/artists/', dest: 'data/compiled/allArtists.json'}, () => {return;})
};

mergingService();
