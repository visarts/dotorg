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
    this.storeService = new StoreService(dataService.getAuthorsData(), dataService.getArtistsData());
    this.updateStore = this.updateStore.bind(this);
    //this.updateCurrentAuthor = this.updateCurrentAuthor.bind(this);
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.state = this.storeService.getStore();
  }

  updateStore (newStore) {
    this.storeService.updateStore(newStore);
    this.setState(this.storeService.getStore());
  }

  updateCurrentAuthor (newAuthor) {
    this.storeService.updateCurrentAuthor(newAuthor);
    this.setState(this.storeService.getStore());
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

      Resolve issue where clearing session storage and going to a bookmark loses author/work data
        Consider redoing store where current work and creator is fetched by location parts

    */

    return (
      <Router>
          <Route path='/' render={routeProps => (
            <div className="app">
              <GlobalHeader
                updateStore={this.updateStore}
                store={this.state}
                {...routeProps} />
              <GlobalNav
                updateStore={this.updateStore}
                store={this.state}
                {...routeProps} />
              <GlobalView
                artistsData={this.artistsData}
                authorsData={this.authorsData}
                updateStore={this.updateStore}
                updateCurrentAuthor={this.storeService.updateCurrentAuthor}
                store={this.state}
                {...routeProps} />
              <GlobalFooter
                updateStore={this.updateStore}
                store={this.state}
                {...routeProps} />
            </div>
          )}/>
      </Router>
    );
  }
}
