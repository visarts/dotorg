const jsonConcat = require('json-concat');

const mergingService = () => {
  jsonConcat({src: 'data/literature/', dest: 'data/prod/allAuthors.json'}, () => {return;});
  jsonConcat({src: 'data/artwork/', dest: 'data/prod/allArtists.json'}, () => {return;});
};

mergingService();
