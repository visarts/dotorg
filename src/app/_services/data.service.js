import axios from 'axios'

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

const getHTMLContent = (creatorId, itemId) => {
  return axios.get(`./content/literature/${creatorId}/${itemId}.html`, {
    transformResponse: res => decodeURIComponent(res)
  })
    .then((results) => {
      return results.data
    })
}

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

const getNavigationData = (routing) => {
  const navigationData = {
    root: {
      path: '/',
      fullPath: '/',
      name: 'Portitude'
    },
    section: {
      path: routing.section ? `${routing.section}/` : '',
      fullPath: `/${routing.section}/`,
      name: routing.section || ''
    },
    collection: {
      path: routing.collection ? `${routing.collection}/` : '',
      fullPath: `/${routing.section}/${routing.collection}/`,
      name: routing.collection || ''
    },
    item: {
      path: routing.item ? `${routing.item}/` : '',
      fullPath: `/${routing.section}/${routing.collection}/${routing.item}`,
      name: routing.item.split('-')[0] || ''
    }
  }
  return navigationData
}

const dataService = {
  getCollections,
  getItems,
  getHTMLContent,
  getRoutingState,
  getAllData,
  getNavigationData
}

export default dataService
