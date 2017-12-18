const fs = require('fs-extra');
const artwork_categories = require('../data/artwork/collections/categories.json');
const artwork_creators = require('../data/artwork/collections/creators.json');
const literature_categories = require('../data/literature/collections/categories.json');
const literature_creators = require('../data/literature/collections/creators.json');

const mergingService = () => {

  const artwork_collections = Object.assign({}, artwork_categories, artwork_creators);
  const literature_collections = Object.assign({}, literature_categories, literature_creators);

  for (const index in artwork_creators) {
    const artist = require(`../data/artwork/items/${index}.json`);
    if (artist) {
      
    }
  }

  for (const index in literature_creators) {
    const author = require(`../data/literature/items/${index}.json`);
    if (author) {
      literature_items = literature_items.concat(author);
    }
  }

  fs.writeJson('data/prod/artwork-collections.json', artwork_collections);
  fs.writeJson('data/prod/artwork-items.json', artwork_items);
  fs.writeJson('data/prod/literature-collections.json', literature_collections);
  fs.writeJson('data/prod/literature-items.json', literature_items);
};

mergingService();
