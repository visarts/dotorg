import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import dataService from 'Services/data.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import GlobalView from './globalView/globalView.component';
//import { CSSTransitionGroup } from 'react-transition-group'

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    let current = {
      section: null,
      creator: null,
      category: null,
      work: null
    };
    this.state = {
      searchInput: sessionStorage.getItem('searchInput') ? sessionStorage.getItem('searchInput') : '',
      current: sessionStorage.getItem('current') ? JSON.parse(sessionStorage.getItem('current')) : current
    };
    sessionStorage.setItem('current', JSON.stringify(this.state.current));
  }

  updateSearchInput (input) {
    sessionStorage.setItem('searchInput', input);
    this.setState({ searchInput: input });
  }

  updateCurrent (key, value) {
    const current = this.state.current;
    this.setState({ current: Object.assign(current, {[key]: value})});
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

      prevent history from pushing a duplicate object
          push the duplicate object to the front and delete the other

    */

    return (
      <Router>
          <Route path='/' render={routeProps => (
            <div className="app">
              <GlobalHeader
                searchInput={this.state.searchInput}
                updateSearchInput={this.updateSearchInput}
                {...routeProps} />
              <GlobalNav
                {...routeProps} />
              <GlobalView
                artistsData={this.artistsData}
                authorsData={this.authorsData}
                searchInput={this.state.searchInput}
                updateSearchInput={this.updateSearchInput}
                updateCurrent={this.updateCurrent}
                {...routeProps} />
              <GlobalFooter
                {...routeProps} />
            </div>
          )}/>
      </Router>
    );
  }
}
