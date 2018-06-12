
const setStore = (newStore) => {
  localStorage.setItem('store', JSON.stringify(newStore))
}

const getStore = () => {
  const store = localStorage.getItem('store')
  return store ? JSON.parse(store) : {}
}

const clearStore = () => {
  localStorage.removeItem('store')
}

const storeService = { setStore, getStore, clearStore }

export default storeService
