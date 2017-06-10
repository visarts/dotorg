import React from 'react';
import { Route } from 'react-router-dom';
import HomeView from './homeView/homeView.component';
import ArtsView from './artsView/artsView.component';
import LiteratureView from './literatureView/literatureView.component';
import SearchView from './searchView/searchView.component';


export default class GlobalView extends React.Component {

  render () {
    return (
      <div className="globalView">
        <div className="globalContainer">
          <Route exact path='/' render={routeProps => (
            <HomeView
              artistsData={this.props.artistsData}
              authorsData={this.props.authorsData}
              {...routeProps} />
          )} />
          <Route path="/literature" render={routeProps => (
            <LiteratureView
              authorsData={this.props.authorsData}
              {...routeProps} />
          )} />
          <Route path="/arts" render={routeProps => (
            <ArtsView
              artistsData={this.props.artistsData}
              {...routeProps} />
          )} />
          <Route path="/search" render={routeProps => (
            <SearchView
              artistsData={this.props.artistsData}
              authorsData={this.props.authorsData}
              searchInput={this.props.searchInput}
              updateSearchInput={this.props.updateSearchInput}
              {...routeProps} />
          )} />
        </div>
      </div>
    );
  }
}
