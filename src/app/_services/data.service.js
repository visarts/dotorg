import axios from 'axios'
import _ from 'lodash'

import storeService from 'Services/store.service'

const { artwork, literature } = storeService.getStore()
console.log(literature)
/*const getAuthorData = (author) => {
  const authorData = require(`authors/${author}.json`)
  return authorData
}*/

/*const getAuthorsData = () => {
  const authorsData = require('authors.json')
  return authorsData.authors
}*/

/*const getArtistData = (artist) => {
  const artistData = require(`artists/${artist}.json`)
  return artistData
}*/

/*const getArtistsData = () => {
  const artistsData = require('artists.json')
  return artistsData.artists
}*/

/*const getArtistNames = () => {
  const namesData = require('creatorKeys.json')
  return namesData.artists
}

const getAuthorNames = () => {
  const namesData = require('creatorKeys.json')
  return namesData.authors
}

const getAllLiterature = () => {
  return axios.get('./data/allAuthors.json')
    .then((results) => {
      return results.data
    })
}

const getAllArtwork = () => {
  return axios.get('./data/allArtists.json')
    .then((results) => {
      return results.data
    })
}*/

const getCollections = type => {
  return axios.get(`./data/${type}-collections.json`, {
    transformResponse: res => decodeURIComponent(res)
  })
    .then((results) => {
      return JSON.parse(results.data)
    })
}

const getItems = type => {
  return axios.get(`./data/${type}-items.json`, {
    transformResponse: res => decodeURIComponent(res)
  })
    .then((results) => {
      return JSON.parse(results.data)
    })
}

/*
  scenarios:
    a) front page gets all items with all creators and any combination of collections, creators, and items
    b) section page
*/

const getLiteratureCreator = creatorId => {
  return literature.collections[creatorId]
}

// gets all creators and their items in a given collection
const getLiteratureCreatorsByCollection = (collectionId) => {
  const collection = literature.collections[collectionId]
  const parsedCollection = _.map(collection.items, item => {
    const creatorId = item.id.split('-')[0]
    const creator = getLiteratureCreator(creatorId)
  })
}

// gets all collections and their items with a given creator
const getLiteratureCollectionsByCreator = (creatorId) => {

}

const getHTMLContent = (creatorId, itemId) => {
  return axios.get(`./content/literature/${creatorId}/${itemId}.html`, {
    transformResponse: res => decodeURIComponent(res)
  })
    .then((results) => {
      return results.data
    })
}

/*const getCurrentRouting = (currentRoute) => {
  let params = currentRoute.slice(1).split('/')
  let mappedParams = {
    currentSection: params[0] || '',
    currentSubSection: params[1] ? params[1] : '',
    currentCreator: params[2] ? params[2] : '',
    currentWork: params[3] ? params[3] : '',
    isSpecial: params[1] && params[1] === 'genres' ? true : false
  }
  return mappedParams
}*/

/*
DOTORG routing

Section:		  Key:		Label1:		Label2:			       Label3:
                                (requires label3)
[0			       1		  2			    3				           4		    ]
/literature		/a		  /:author	/:genre			       /:workTitle
			        /g		  /:genre		/:author		       /:workTitle

/arts			    /a		  /:artist	/:style			       /:workTitle
			        /g		  /:style		/:artist           /:workTitle

/search


Section:
/literature

Author:
/literature/a/kipling

Genre:
/literature/g/shorts

Work from author:

/literature/a/kipling/shorts/kipling-short-name-1899

Work from genre:

/literature/g/shorts/kipling/kipling-short-name-1899

*/
/* const getCurrentRouting = (currentRoute) => {
  const params = currentRoute.slice(1).split('/')
  const mappedParams = {
    currentSection: params[0] || '',
    currentSubSection: params[1] && params[1] === 'a' && params[3] ? params[3] : params[1] && params[1] === 'g' && params[2] ? params[2] : '',
    currentCreator: params[1] && params[1] === 'a' && params[2] ? params[2] : params[1] && params[1] === 'g' && params[3] ? params[3] : '',
    currentWork: params[4] ? params[4] : '',
    routeKey: params[1] ? params[1] : ''
  }
  return mappedParams
} */

const getRoutingState = (currentRoute) => {
  const params = currentRoute.slice(1).split('/')
  const mappedParams = {
    section: params[0] || '',
    collection: params[1] || '',
    item: params[2] || ''
  }
  return mappedParams
}

const getAllData = () => {
  // const store = localStorage.getItem('store')
  return Promise.all([
    getCollections('artwork'),
    getItems('artwork'),
    getCollections('literature'),
    getItems('literature')
  ])
  .then(response => {
    const [ artwork_collections, artwork_items, literature_collections, literature_items ] = response
    return {
      artwork: {
        collections: artwork_collections,
        items: artwork_items
      },
      literature: {
        collections: literature_collections,
        items: literature_items
      }
    }
  })
}

const dataService = {
  //getAuthorNames,
  //getArtistNames,
  //getAllLiterature,
  //getAllArtwork,
  getCollections,
  getItems,
  getHTMLContent,
  getRoutingState,
  getAllData
  //getCurrentRouting
}

export default dataService
