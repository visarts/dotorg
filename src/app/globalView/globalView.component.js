import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from './homeView/homeView.component';
import ArtsView from './artsView/artsView.component';
import LiteratureView from './literatureView/literatureView.component';
import SearchView from './searchView/searchView.component';
import TestView from './testView/testView.component';

const GlobalView = (props) => {

  return (
    <div className="globalView">
      <div className="globalContainer">
        <Switch location={props.location} key={props.location.key}>
          <Route exact path='/' render={routeProps => (
            <HomeView
              artistsData={props.artistsData}
              authorsData={props.authorsData}
              {...routeProps} />
          )} />
          <Route path="/literature" render={routeProps => (
            <LiteratureView
              authorsData={props.authorsData}
              updateStore={props.updateStore}
              updateCurrentAuthor={props.updateCurrentAuthor}
              store={props.store}
              {...routeProps} />
          )} />
          <Route path="/arts" render={routeProps => (
            <ArtsView
              artistsData={props.artistsData}
              updateStore={props.updateStore}
              store={props.store}
              {...routeProps} />
          )} />
          <Route path="/search" render={routeProps => (
            <SearchView
              artistsData={props.artistsData}
              authorsData={props.authorsData}
              searchInput={props.searchInput}
              updateStore={props.updateStore}
              store={props.store}
              {...routeProps} />
          )} />
          <Route exact path="/test" component={TestView} />
        </Switch>
      </div>
    </div>
  );
};

export default GlobalView;
