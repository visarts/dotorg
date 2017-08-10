import dataService from 'Services/data.service';

/* a pseudo Redux lite */
export default class StoreService {
  constructor () {
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.updateStore = this.updateStore.bind(this);
    this.updateCurrentAuthor = this.updateCurrentAuthor.bind(this);
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

  updateCurrentAuthor (newAuthor) {
    let newStore = this.getStore();
    if (!newStore.currentCreator || newStore.currentCreator.authorKey !== newAuthor) {
      newStore.currentCreator = this.authorsData.filter((item) => {
        return item.authorKey === newAuthor;
      })[0];
    }
    sessionStorage.setItem('pStore', JSON.stringify(newStore));

  }

  clearStore () {
    sessionStorage.setItem('pStore', JSON.stringify({}));
  }
}
