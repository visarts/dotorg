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
    this.updateStore = this.updateStore.bind(this);
    this.currentLocation = location.hash.slice(1);
    this.state = this.storeService.getStore(this.currentLocation);
  }

  updateStore (newStore) {
    this.storeService.updateStore(newStore);
    this.setState(this.storeService.getStore());
  }

  // this will update when the route changes and set state and store with new params
  componentWillReceiveProps (nextProps) {
    let updatedLocation = nextProps.location.pathname;
    if (this.currentLocation !== updatedLocation) {
      this.storeService.setStore(updatedLocation);
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

      Refactor set store to be more agnostic to allow for non-current creator/work related data

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
