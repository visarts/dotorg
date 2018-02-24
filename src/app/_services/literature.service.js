import _ from 'lodash'

import storeService from 'Services/store.service'

const { artwork, literature } = storeService.getStore()

const getCollection = collectionId => {
  return literature.collections[collectionId]
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

export default { getCollectionGroupedByCreators, getCreatorGroupedByCollections, getCollection }
