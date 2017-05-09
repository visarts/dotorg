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
          <Route exact path='/' component={Home} />
          <Route exact path='/literature' render={() => (
            <LitHome data={this.authorsData.authors} />
          )} />
          <Route exact path='/literature/:author' component={AuthorsHome} />
          <Route exact path='/literature/:author/:work' render={({location, match}) => (
            <AuthorLitHome data={this.authorsData.authors.filter(item => item.authorKey === match.params.author)[0]} currentMatch={match} />
          )} />
          <Route exact path='/arts' component={ArtsHome} />
          <Route exact path='/arts/:artist' component={ArtistsHome} />
          <Route path='/' render={() => (
            <GlobalFooter />
          )} />
        </div>
      </Router>
    )
  }

}
