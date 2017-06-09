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
          <Route exact path='/' render={defaultProps => (
            <HomeView
              artistsData={this.props.artistsData}
              authorsData={this.props.authorsData}
              {...defaultProps} />
          )} />
          <Route path="/literature" render={defaultProps => (
            <LiteratureView
              authorsData={this.props.authorsData}
              {...defaultProps} />
          )} />
          <Route path="/arts" render={defaultProps => (
            <ArtsView
              artistsData={this.props.artistsData}
              {...defaultProps} />
          )} />
          <Route path="/search" render={defaultProps => (
            <SearchView
              artistsData={this.props.artistsData}
              authorsData={this.props.authorsData}
              searchInput={this.props.searchInput}
              updateSearchInput={this.props.updateSearchInput}
              {...defaultProps} />
          )} />
        </div>
      </div>
    );
  }
}
