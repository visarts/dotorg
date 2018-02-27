const getNavigationData = routing => {
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

const navigationService = {
  getNavigationData
}

export default navigationService
