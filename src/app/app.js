import React from 'react';
import { Route } from 'react-router-dom';
import dataService from 'Services/data.service';
import StoreService from 'Services/store.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import GlobalView from './globalView/globalView.component';

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.storeService = new StoreService();
    this.storeService.setStore(this.props.data);
    this.store = this.storeService.getStore();
    this.updateAppState = this.updateAppState.bind(this);
    this.currentLocation = location.hash.slice(1);

    this.state = {
      routing: dataService.getCurrentRouting(this.currentLocation),
      getTrimmedURI: this.getTrimmedURI.bind(this)
    };
  }

  updateAppState (newState) {
    this.setState(Object.assign(this.state, newState));
  }

  // allows for routing changes in modals and the like when origin is unknown
  getTrimmedURI (num) {
    if (num) {
      let numb = parseInt(num);
      let params = location.hash.slice(2).split('/');
      for (let i = 0; i < num; i++) {
        params.pop();
      }
      let newParams = params.join('/');
      return newParams;
    }
  }


  // this will update when the route changes and set state with new params
  componentWillReceiveProps (nextProps) {
    let updatedLocation = nextProps.location.pathname;
    if (this.currentLocation !== updatedLocation) {
      this.setState({routing: dataService.getCurrentRouting(updatedLocation)}, () => {
        this.currentLocation = updatedLocation;
        console.log(nextProps);
        if (!this.state.routing.currentWork) {
          window.scroll(0, 0);
        }
      });
    }
  }

  render () {

    /* TODO
      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately
          -- could use same category as novels, when those are added, as 'chaptered' content

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      Add middle tier sizing layout for tablets, etc

      Add historical memory for read completion in literature

      refactor arts carousel to use css animation and a single array

    */

    return (
      <div className="app">
        <GlobalHeader
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
        <GlobalNav
          store={this.store}
          appState={this.state}
          updateAppState={this.updateAppState} />
        <GlobalFooter
          store={this.state}
          appState={this.state}
          updateAppState={this.updateAppState} />
      </div>
    );
  }
}
