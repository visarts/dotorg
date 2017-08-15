import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
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
    //this.updateCurrentAuthor = this.updateCurrentAuthor.bind(this);
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.storeService = new StoreService(this.authorsData, this.artistsData);

    this.currentLocation = location.hash.slice(2);
    this.getLocationParams = this.getLocationParams.bind(this);

    this.storeService.setStore(this.getLocationParams());
    this.state = this.storeService.getStore();

  }

  componentWillReceiveProps () {
    let hash = location.hash.slice(2);
    this.storeService.setStore(this.getLocationParams());
    if (this.currentLocation !== hash) {
      this.setState(this.storeService.getStore());
    }

  }

  getLocationParams () {
    let hash = location.hash.slice(2);
    let params = hash.split('/');
    const mappedParams = {
      currentSection: params ? params[0] : '',
      currentCreator: params[1] ? params[1] : '',
      currentWork: params[2] ? params[2] : ''
    }

    return mappedParams;
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

    */

    return (
      <Route path='/' render={routeProps => (
        <div className="app">
          <GlobalHeader
            store={this.state}
            {...routeProps} />
          <GlobalNav
            store={this.state}
            {...routeProps} />
          <GlobalView
            artistsData={this.artistsData}
            authorsData={this.authorsData}
            store={this.state}
            {...routeProps} />
          <GlobalFooter
            store={this.state}
            {...routeProps} />
        </div>
      )}/>
    );
  }
}
