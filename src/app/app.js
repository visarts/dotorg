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
          <Route path='/' render={props => (
            <GlobalHeader
              {...props} />
          )}/>
          <Route path='/' render={props => (
            <GlobalNav
              {...props} />
          )} />
          <Route exact path='/' render={props => (
            <Home
              artistsData={this.artistsData}
              authorsData={this.authorsData}
              {...props} />
          )} />


          <Route exact path='/literature' render={props => (
            <LitHome
              authorsData={this.authorsData}
              {...props} />
          )} />
          <Route path='/literature/:author' render={props => (
            <AuthorsHome
              currentAuthor={this.authorsData.filter(item => item.authorKey === props.match.params.author)[0]}
              {...props} />
          )} />
          <Route exact path='/literature/:author/:work' render={props => (
            <AuthorLitHome
              data={this.authorsData.filter(item => item.authorKey === props.match.params.author)[0]}
              {...props} />
          )} />


          <Route exact path='/arts' render={props => (
            <ArtsHome
              artistsData={this.artistsData}
              {...props} />
          )} />
          <Route exact path='/arts/:artist' render={props => (
            <ArtistsHome
              currentArtist={this.artistsData.filter(item => item.artistKey === props.match.params.artist)[0]}
              {...props} />
          )} />


          <Route path='/' render={props => (
            <GlobalFooter
              {...props} />
          )} />
        </div>
      </Router>
    )
  }
}
