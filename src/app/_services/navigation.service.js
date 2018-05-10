import artworkService from 'Services/artwork.service'
import literatureService from 'Services/literature.service'
import _ from 'lodash'

const getnavigation = routing => {
  const collection = artworkService.getCollection(routing.collection) ||
    literatureService.getCollection(routing.collection) || ''
  const navigation = {
    root: {
      path: '/',
      fullPath: '/',
      name: 'Portitude'
    },
    section: {
      path: routing.section ? `${routing.section}/` : '',
      fullPath: routing.section ? `/${routing.section}/` : '',
      name: routing.section && _.capitalize(routing.section) || ''
    },
    collection: {
      path: routing.collection ? `${routing.collection}/` : '',
      fullPath: routing.colection ? `/${routing.section}/${routing.collection}/` : '',
      name: (collection && collection.name) || '',
      type: collection.type
    },
    item: {
      path: routing.item ? `${routing.item}/` : '',
      fullPath: routing.item ? `/${routing.section}/${routing.collection}/${routing.item}` : '',
      name: routing.item.split('-')[0] || ''
    }
  }
  return navigation
}

const getCurrent = routing => {
  const current = routing.item
    ? 'item'
    : routing.collection && ! routing.item
      ? 'collection'
      : routing.section && !routing.collection
        ? 'section'
        : 'root'
  return current
}

const navigationService = {
  getnavigation,
  getCurrent,
}

export default navigationService
