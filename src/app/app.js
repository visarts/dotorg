import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
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
    this.storeService = new StoreService();
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.state = this.storeService.getStore();
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

      FIX ISSUE WITH SEARCH NOT REFRESHING RESULTS

      wire up literature with store service and reduce complexity 

    */

    return (
      <Router>
          <Route path='/' render={routeProps => (
            <div className="app">
              <GlobalHeader
                storeService={this.storeService}
                {...routeProps} />
              <GlobalNav
                {...routeProps} />
              <GlobalView
                artistsData={this.artistsData}
                authorsData={this.authorsData}
                storeService={this.storeService}
                {...routeProps} />
              <GlobalFooter
                {...routeProps} />
            </div>
          )}/>
      </Router>
    );
  }
}
