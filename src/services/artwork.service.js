import _ from 'lodash'

import storeService from 'Services/store.service'

const { artwork } = storeService.getStore()

const getCollection = collectionId => {
  console.log(artwork.collections, collectionId)
  return artwork.collections[collectionId]
}

const getItem = (collectionId, itemId) => {
  return _.find(artwork.collections[collectionId].items, item => item.id === itemId)
}

const getItemWith = (collectionId, itemId) => {
  const item = getItem(collectionId, itemId)
  const creatorId = _.head(item.id.split('-'))
  const creator = getCollection(creatorId)
  const collection = getCollection(item.category)
  const itemWith = {
    id: item.id,
    name: item.name,
    creator: {
      id: creatorId,
      name: creator.name,
      desc: creator.desc,
      dates: creator.dates,
      category: creator.category
    },
    collection: {
      id: item.category,
      name: collection.name,
      desc: collection.desc,
      dates: collection.dates
    }
  }
  return itemWith
}

const getAllCreatorKeys = () => {
  return _.keys(artwork.collections)
}

// returns metadata of each creator in an array
const getAllCreatorsMetaData = () => {
  // here compact removes the undefined elements that map returns due to them being 'category' types
  const creators = _.compact(_.map(artwork.collections, (creator, creatorKey) => {
    if (creator.type === 'creator') {
      return {
        id: creatorKey,
        name: creator.name,
        desc: creator.desc,
        dates: creator.dates,
        category: creator.category
      }
    }
  }))
  return creators
}

const getAllCollectionsMetaData = () => {
  // here compact removes the undefined elements that map returns due to them being 'category' types
  const collections = _.compact(_.map(artwork.collections, (collection, collectionKey) => {
    if (collection.type === 'category') {
      return {
        id: collectionKey,
        name: collection.name,
        desc: collection.desc,
        dates: collection.dates
      }
    }
  }))
  return collections
}

// returns an array of creators that includes creator metadata and an items array of items matching the collection in that creator
const getCollectionGroupedByCreators = collectionId => {
  const collection = artwork.collections[collectionId]
  const creatorNames = []
  const creators = []
  _.map(collection.items, collectionItem => {
    const creatorId = _.head(collectionItem.id.split('-'))
    if (!_.includes(creatorNames, creatorId)) {
      const creator = artwork.collections[creatorId]
      creatorNames.push(creatorId)
      creators.push({
        id: creatorId,
        name: creator.name,
        dates: creator.dates,
        desc: creator.desc,
        category: creator.category,
        items: []
      })
    }
    const creatorMatch = _.find(creators, creatorItem => creatorItem.id === creatorId)
    creatorMatch.items.push(collectionItem)
  })
  return creators
}

const getCollectionPath = collectionId => {
  return `/artwork/${collectionId}`
}

const getItemPath = (collectionId, itemId) => {
  return `/artwork/${collectionId}/${itemId}`
}

const getImagePathLg = (collectionId, itemId) => {
  return `../content/artwork/${collectionId}/${itemId}.jpg`
}

const getImagePathSm = (collectionId, itemId) => {
  return `../content/artwork/${collectionId}/${itemId}_sm.jpg`
}

export default {
  getCollectionGroupedByCreators,
  getCollection,
  getItem,
  getItemWith,
  getItemPath,
  getImagePathLg,
  getImagePathSm,
  getCollectionPath,
  getAllCreatorKeys,
  getAllCreatorsMetaData,
  getAllCollectionsMetaData
}
