const fs = require('fs-extra');
const artwork_categories = require('../data2/artwork/collections/categories.json');
const artwork_creators = require('../data2/artwork/collections/creators.json');
const literature_categories = require('../data2/literature/collections/categories.json');
const literature_creators = require('../data2/literature/collections/creators.json');

const mergingService2 = () => {

  const artwork_collections = artwork_categories.concat(artwork_creators);
  const literature_collections = literature_categories.concat(literature_creators);

  let artwork_items = [];
  let literature_items = [];

  for (const index in artwork_creators) {
    const artist = require(`../data2/artwork/items/${artwork_creators[index].id}.json`);
    console.log(artist);
    if (artist) {
      artwork_items = artwork_items.concat(artist);
    }
  }

  for (const index in literature_creators) {
    const author = require(`../data2/literature/items/${literature_creators[index].id}.json`);
    if (author) {
      literature_items = literature_items.concat(author);
    }
  }

  fs.writeJson('data/prod2/artwork-collections.json', artwork_collections);
  fs.writeJson('data/prod2/artwork-items.json', artwork_items);
  fs.writeJson('data/prod2/literature-collections.json', literature_collections);
  fs.writeJson('data/prod2/literature-items.json', literature_items);
};

mergingService2();
