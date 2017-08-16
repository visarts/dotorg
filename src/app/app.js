import React from 'react';
import { Route } from 'react-router-dom';
import dataService from 'Services/data.service';
import StoreService from 'Services/store.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import GlobalView from './globalView/globalView.component';
//import { CSSTransitionGroup } from 'react-transition-group'

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.storeService = new StoreService(dataService);
    this.getMappedLocationParams = this.getMappedLocationParams.bind(this);
    this.updateStore = this.updateStore.bind(this);
    this.currentLocation = location.hash.slice(1);
    this.state = this.storeService.getStore();
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

  updateStore (newStore) {
    this.storeService.updateStore(newStore);
    this.setState(this.storeService.getStore());
  }

  // this will update when the route changes and set state and store with new params
  componentWillReceiveProps (nextProps) {
    let updatedLocation = nextProps.location.pathname;
    if (this.currentLocation !== updatedLocation) {
      this.storeService.setStore(this.getMappedLocationParams(updatedLocation));
      this.currentLocation = updatedLocation;
      this.setState(this.storeService.getStore());
    }
  }

  render () {

    /* TODO
      make a webpack plugin that will create a master json file from subs

      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      add routing for art eras and lit genres

      Fix potential issue on literature display view with race condition

      Refactor set store to be more agnostic to allow for non-current creator/work related data


      resolve issue where clearing localStorage and returning to a bookmark causes data read errors
    */

    return (
      <Route path="/" render={routeProps => (
        <div className="app">
          <GlobalHeader
            store={this.state}
            updateStore={this.updateStore}
            {...routeProps} />
          <GlobalNav
            store={this.state}
            updateStore={this.updateStore}
            {...routeProps} />
          <GlobalView
            store={this.state}
            updateStore={this.updateStore}
            {...routeProps} />
          <GlobalFooter
            store={this.state}
            updateStore={this.updateStore}
            {...routeProps} />
        </div>
      )}/>
    );
  }
}
