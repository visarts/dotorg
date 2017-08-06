
/* a pseudo Redux lite */
export default class StoreService {
  constructor () {
    this.updateStore = this.updateStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.clearStore = this.clearStore.bind(this);
  }

  getStore () {
    let store = sessionStorage.getItem('pStore');
    return store ? JSON.parse(store) : {};
  }

  updateStore (newStore) {
    if (newStore !== null) {
      let store = Object.assign(this.getStore(), newStore);
      sessionStorage.setItem('pStore', JSON.stringify(store));
    }
  }

  clearStore () {
    sessionStorage.setItem('pStore', JSON.stringify({}));
  }
}
