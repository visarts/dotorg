import _ from 'lodash'

import storeService from 'Services/store.service'

const { literature } = storeService.getStore()

const getCollection = collectionId => {
  return literature.collections[collectionId]
}

const getItem = (collectionId, itemId) => {
  return _.find(literature.collections[collectionId].items, item => item.id === itemId)
}

const getItemWith = (collectionId, itemId) => {
  const item = getItem(collectionId, itemId)
  const creatorId = _.head(item.id.split('-'))
  const creator = getCollection(creatorId)
  const collection = getCollection(item.category)
  const itemWith = {
    id: item.id,
    name: item.name,
    pageSizes: item.pageSizes,
    creator: {
      id: creatorId,
      name: creator.name,
      desc: creator.desc,
      dates: creator.dates
    },
    collection: {
      id: item.category,
      name: collection.name,
      desc: collection.desc
    }
  }
  return itemWith
}

const getAllCreatorKeys = () => {
  return _.keys(literature.collections)
}
// returns metadata of each creator in an array
const getAllCreatorsMetaData = () => {
  // here compact removes the undefined elements that map returns due to them being 'category' types
  const creators = _.compact(_.map(literature.collections, (creator, creatorKey) => {
    if (creator.type === 'creator') {
      return {
        id: creatorKey,
        name: creator.name,
        desc: creator.desc,
        dates: creator.dates
      }
    }
  }))
  return creators
}

const getAllCollectionsMetaData = () => {
  // here compact removes the undefined elements that map returns due to them being 'category' types
  const collections = _.compact(_.map(literature.collections, (collection, collectionKey) => {
    if (collection.type === 'category') {
      return {
        id: collectionKey,
        name: collection.name,
        desc: collection.desc
      }
    }
  }))
  return collections
}

// returns an array of creators that includes creator metadata and an items array of items matching the collection in that creator
const getCollectionGroupedByCreators = collectionId => {
  const collection = literature.collections[collectionId]
  const creatorNames = []
  const creators = []
  _.map(collection.items, collectionItem => {
    const creatorId = _.head(collectionItem.id.split('-'))
    if (!_.includes(creatorNames, creatorId)) {
      const creator = literature.collections[creatorId]
      console.log(creator)
      creatorNames.push(creatorId)
      creators.push({
        id: creatorId,
        name: creator.name,
        dates: creator.dates,
        desc: creator.desc,
        items: []
      })
    }
    const creatorMatch = _.find(creators, creatorItem => creatorItem.id === creatorId)
    creatorMatch.items.push(collectionItem)
  })
  return creators
}

const getCreatorGroupedByCollections = creatorId => {
  const creator = literature.collections[creatorId]
  const collectionNames = []
  const collections = []
  _.map(creator.items, creatorItem => {
    const collectionId = creatorItem.category
    if (!_.includes(collectionNames, collectionId)) {
      const collection = literature.collections[collectionId]
      collectionNames.push(collectionId)
      collections.push({
        id: collectionId,
        name: collection.name,
        desc: collection.desc,
        items: []
      })
    }
    const collectionMatch = _.find(collections, collectionItem => collectionItem.id === collectionId)
    collectionMatch.items.push(creatorItem)
  })
  return collections
}

const getCollectionPath = collectionId => {
  return `/literature/${collectionId}`
}

const getItemPath = (collectionId, itemId) => {
  return `/literature/${collectionId}/${itemId}`
}

export default {
  getCollectionGroupedByCreators,
  getCreatorGroupedByCollections,
  getCollection,
  getItem,
  getItemWith,
  getItemPath,
  getCollectionPath,
  getAllCreatorKeys,
  getAllCreatorsMetaData,
  getAllCollectionsMetaData
}
