import dataService from 'Services/data.service';

/* a pseudo Redux lite */
export default class StoreService {
  constructor (authorsData, artistsData) {
    this.authorsData = authorsData;
    this.artistsData = artistsData;
    this.updateStore = this.updateStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.clearStore = this.clearStore.bind(this);

    this.setStore = this.setStore.bind(this);

  }

  getStore () {
    let store = localStorage.getItem('pStore');
    return store ? JSON.parse(store) : {};
  }

  setStore (params) {
    let newStore = this.getStore();
    newStore.currentSection = params.currentSection || '';

    if (params.currentCreator) {
      let data = newStore.currentSection === 'arts' ? this.artistsData : this.authorsData;
      let creatorData = newStore.currentSection === 'arts' ? dataService.getArtistData(params.currentCreator) : dataService.getAuthorData(params.currentCreator);

      if (!newStore.currentCreator || newStore.currentCreator.creatorKey !== params.currentCreator) {
        newStore.currentCreator = data.filter(item => {
          return item.creatorKey === params.currentCreator;
        })[0];
      }
      newStore.currentCreator.content = creatorData.content;

      if (params.currentWork) {
        if (!newStore.currentWork || newStore.currentWork.fileName !== params.currentWork) {
          newStore.currentWork = creatorData.content.filter(item => {
            return item.fileName === params.currentWork;
          })[0];
        }
      } else {
        newStore.currentWork = '';
      }
    } else {
      newStore.currentCreator = '';
      newStore.currentWork = '';
    }

    this.updateStore(newStore);
  }

  updateStore (newStore) {
    if (newStore !== null) {
      let store = Object.assign(this.getStore(), newStore);
      localStorage.setItem('pStore', JSON.stringify(store));
    }
  }

  clearStore () {
    localStorage.setItem('pStore', JSON.stringify({}));
  }
}
