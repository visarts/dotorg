import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import dataService from 'Services/data.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import Home from './home/home.component';
import LitHome from './litHome/litHome.component';
import AuthorsHome from './authorsHome/authorsHome.component';
import ArtsHome from './artsHome/artsHome.component';
import ArtistsHome from './artistsHome/artistsHome.component';
import AuthorLitHome from './authorLitHome/authorLitHome.component';


export default class App extends React.Component {

  constructor () {
    super();
    this.authorsData = dataService.getAuthorsData();
    this.artistsData = dataService.getArtistsData();
  }
  render () {

/* TODO
    break art and literature routing into their respective components
    have author content be either a child of the author home component view
      or create a component just for author title that will shrink or expand
      based on which view we're in
    figure out why styles like a:hover aren't inheriting
    rethink folder structure?
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
        <div className="appHome">
          <Route path='/' render={({location, match}) => (
            <GlobalHeader currentPath={location.pathname} currentMatch={match} />
          )}/>
          <Route path='/' render={({location}) => (
            <GlobalNav currentPath={location.pathname}  />
          )} />
          <Route exact path='/' render={() => (
            <Home
              artistsData={this.artistsData.artists}
              authorsData={this.authorsData.authors} />
          )} />


          <Route exact path='/literature' render={() => (
            <LitHome data={this.authorsData.authors} />
          )} />
          <Route path='/literature/:author' component={AuthorsHome} />
          <Route exact path='/literature/:author/:work' render={({location, match}) => (
            <AuthorLitHome
              data={this.authorsData.authors.filter(item => item.authorKey === match.params.author)[0]}
              currentMatch={match} />
          )} />


          <Route exact path='/arts' render={({location, match}) => (
            <ArtsHome data={this.artistsData.artists} currentLocation={location} />
          )} />
          <Route exact path='/arts/:artist' component={ArtistsHome} />


          <Route path='/' render={() => (
            <GlobalFooter />
          )} />
        </div>
      </Router>
    )
  }

}
