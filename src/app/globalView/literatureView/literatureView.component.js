import React from 'react';
import { Route } from 'react-router-dom';
import LiteratureHome from './literatureHome/literatureHome.component';
import LiteratureAuthor from './literatureAuthor/literatureAuthor.component';
import LiteratureGenre from './literatureGenre/literatureGenre.component';
import LiteratureDisplay from './literatureDisplay/literatureDisplay.component';

const LiteratureView = (props) => {
  return (
    <div className="literatureView">
      <Route exact path='/literature' render={routeProps => (
        <LiteratureHome
          store={props.store}
          store2={props.store2}
          {...routeProps} />
      )} />
      <Route exact path='/literature/genres/:genre' render={routeProps => (
        <LiteratureGenre
          store={props.store}
          {...routeProps} />
      )} />
      <Route path='/literature/:author' render={routeProps => {
        return routeProps.match.params.author !== 'genres' && (
          <LiteratureAuthor
            store={props.store}
            store2={props.store2}
            {...routeProps} />);
      }} />
      <Route path='/literature/:author/:work' render={routeProps => {
        return routeProps.match.params.author !== 'genres' && (
          <LiteratureDisplay
            store2={props.store2}
            store={props.store}
            {...routeProps} />);
      }} />
    </div>
  );
};

export default LiteratureView
