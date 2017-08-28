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
    this.storeService = new StoreService();
    this.storeService.setStore(this.props.data);
    this.store = this.storeService.getStore();
    this.updateAppState = this.updateAppState.bind(this);
    this.currentLocation = location.hash.slice(1);

    this.state = {
      routing: dataService.getCurrentRouting(this.currentLocation)
    }
  }


  updateAppState (newState) {
    this.setState(Object.assign(this.state, newState));
  }

  // this will update when the route changes and set state with new params
  componentWillReceiveProps (nextProps) {
    let updatedLocation = nextProps.location.pathname;
    if (this.currentLocation !== updatedLocation) {
      this.setState({routing: dataService.getCurrentRouting(updatedLocation)}, () => {
        this.currentLocation = updatedLocation;
      });
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
          -- this creates complications with the store service setup. Will need to refactor

      Add middle tier sizing layout for tablets, etc
    */

    return (
      <div className="app">
        <GlobalHeader
          store={this.store}
          appState={this.state}
          updateAppState={this.updateAppState} />
        <GlobalNav
          store={this.store}
          appState={this.state}
          updateAppState={this.updateAppState} />
        <Route path="/" render={routeProps => (
          <GlobalView
            store={this.store}
            appState={this.state}
            updateAppState={this.updateAppState}
            {...routeProps} />
        )}/>
        <GlobalFooter
          store={this.state}
          appState={this.state}
          updateAppState={this.updateAppState} />
      </div>
    );
  }
}
