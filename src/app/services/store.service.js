
/* a pseudo Redux lite */
export default class StoreService {
  constructor () {
    this.getStore = this.getStore.bind(this);
    this.setStore = this.setStore.bind(this);
    this.clearStore = this.clearStore.bind(this);
    localStorage.removeItem('pStore');
  }

  setStore (newStore) {
    localStorage.setItem('store', JSON.stringify(newStore));
  }

  getStore () {
    let store = localStorage.getItem('store');
    return store ? JSON.parse(store) : {};
  }

  clearStore () {
    localStorage.removeItem('store');
  }

}
