import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import dataService from 'Services/data.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import GlobalView from './globalView/globalView.component';
import { CSSTransitionGroup } from 'react-transition-group'


export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.updateSearchInput = this.updateSearchInput.bind(this);

    this.state = {
      searchInput: sessionStorage.getItem('searchInput') ? sessionStorage.getItem('searchInput') : ''
    }
  }

  updateSearchInput (input) {
    sessionStorage.setItem('searchInput', input);
    this.setState({ searchInput: input });
  }

  render () {

    /* TODO
      figure out why styles like a:hover aren't inheriting
      make a webpack plugin that will create a master json file from subs

      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      add routing for art eras and lit genres

    */

    return (
      <Router>
        <div className="app">
          <Route path='/' render={routeProps => (
            <GlobalHeader
              searchInput={this.state.searchInput}
              updateSearchInput={this.updateSearchInput}
              {...routeProps} />
          )}/>
          <Route path='/' render={routeProps => (
            <GlobalNav
              {...routeProps} />
          )} />

          <Route path='/' render={routeProps => (
            <GlobalView
              artistsData={this.artistsData}
              authorsData={this.authorsData}
              searchInput={this.state.searchInput}
              updateSearchInput={this.updateSearchInput}
              {...routeProps} />
          )} />

          <Route path='/' render={routeProps => (
            <GlobalFooter
              {...routeProps} />
          )} />
        </div>
      </Router>
    )
  }
}
