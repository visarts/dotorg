
/* a pseudo Redux lite */
/*export default class StoreService {
  constructor () {
    this.getStore = this.getStore.bind(this);
    this.setStore = this.setStore.bind(this);
    this.clearStore = this.clearStore.bind(this);
  }

  setStore (newStore) {
    localStorage.setItem('store', JSON.stringify(newStore));
  }

  getStore () {
    const store = localStorage.getItem('store');
    return store ? JSON.parse(store) : {};
  }

  clearStore () {
    localStorage.removeItem('store');
  }

}*/

const setStore = (newStore) => {
  localStorage.setItem('store', JSON.stringify(newStore));
};

const getStore = () => {
  const store = localStorage.getItem('store');
  return store ? JSON.parse(store) : {};
};

const clearStore = () => {
  localStorage.removeItem('store');
};

const storeService = { setStore, getStore, clearStore };

export default storeService;
