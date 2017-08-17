
/* a pseudo Redux lite */
export default class StoreService {
  constructor (dataService) {
    this.dataService = dataService;
    this.authorsData = this.dataService.getAuthorsData();
    this.artistsData = this.dataService.getArtistsData();

    this.getMappedLocationParams = this.getMappedLocationParams.bind(this);
    this.getStore = this.getStore.bind(this);
    this.setStore = this.setStore.bind(this);
    this.updateStore = this.updateStore.bind(this);
    this.clearStore = this.clearStore.bind(this);
  }

  // peel the location off into parameters to indicate current location state
  getMappedLocationParams (updatedLocation) {
    let params = updatedLocation.slice(1).split('/');
    const mappedParams = {
      currentSection: params[0] || '',
      currentCreator: params[1] ? params[1] : '',
      currentWork: params[2] ? params[2] : ''
    }
    return mappedParams;
  }

  getStore (updatedLocation) {
    if (updatedLocation) {
      this.setStore(updatedLocation);
    }
    let store = localStorage.getItem('pStore');
    return store ? JSON.parse(store) : {};
  }

  setStore (updatedLocation) {
    let params = this.getMappedLocationParams(updatedLocation);
    // set an initial store if the localStorage object doesn't exist
    let newStore = !localStorage.getItem('pStore') ? {
      currentSection: '',
      currentCreator: '',
      currentWork: '',
      artistsData: this.artistsData,
      authorsData: this.authorsData
    } : this.getStore();
    newStore.currentSection = params.currentSection;

    if (params.currentCreator) {
      let data = newStore.currentSection === 'arts' ? this.artistsData : this.authorsData;
      let creatorData = newStore.currentSection === 'arts' ? this.dataService.getArtistData(params.currentCreator) : this.dataService.getAuthorData(params.currentCreator);

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
    localStorage.removeItem('pStore');
  }
}
