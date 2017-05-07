import React from 'react';
import { Route } from 'react-router-dom';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import Home from './home/home.component';
import LitHome from './litHome/litHome.component';
import AuthorsHome from './authorsHome/authorsHome.component';
import ArtsHome from './artsHome/artsHome.component';
import ArtistsHome from './artistsHome/artistsHome.component';


export default class App extends React.Component {

  constructor () {
    super();
  }
  render () {

/* TODO
    break art and literature routing into their respective components
    have author content be either a child of the author home component view
      or create a component just for author title that will shrink or expand
      based on which view we're in
    figure out why styles like a:hover aren't inheriting
    rethink folder structure?
    break all artist and authors out into their own respective json files
    create json files that are simply lists of author/artist last names, or other data
*/

    return (
      <div className="appMain">
        <Route path='/' render={({location, match}) => (
          <GlobalHeader currentPath={location.pathname} currentMatch={match} />
        )}/>
        <Route path='/' render={({location}) => (
          <GlobalNav currentPath={location.pathname}  />
        )} />
        <Route exact path='/' component={Home} />
        <Route exact path='/literature' component={LitHome} />
        <Route exact path='/literature/:author' component={AuthorsHome} />
        <Route exact path='/arts' component={ArtsHome} />
        <Route exact path='/arts/:artist' component={ArtistsHome} />
        <Route path='/' render={() => (
          <GlobalFooter />
        )} />
      </div>
    )
  }

}
