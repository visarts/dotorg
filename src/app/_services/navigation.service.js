import artworkService from 'Services/artwork.service'
import literatureService from 'Services/literature.service'
import _ from 'lodash'

const getNavigationData = routing => {
  const collection = artworkService.getCollection(routing.collection) ||
    literatureService.getCollection(routing.collection) || ''
  const collectionName = collection && collection.name
  const navigationData = {
    root: {
      path: '/',
      fullPath: '/',
      name: 'Portitude'
    },
    section: {
      path: routing.section ? `${routing.section}/` : '',
      fullPath: `/${routing.section}/`,
      name: routing.section && _.capitalize(routing.section) || ''
    },
    collection: {
      path: routing.collection ? `${routing.collection}/` : '',
      fullPath: `/${routing.section}/${routing.collection}/`,
      name: collectionName || '',
      type: collection.type
    },
    item: {
      path: routing.item ? `${routing.item}/` : '',
      fullPath: `/${routing.section}/${routing.collection}/${routing.item}`,
      name: routing.item.split('-')[0] || ''
    }
  }
  return navigationData
}

const navigationService = {
  getNavigationData
}

export default navigationService
