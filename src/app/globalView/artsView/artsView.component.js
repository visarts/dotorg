import React from 'react';
import { Route } from 'react-router-dom';
import ArtsHome from './artsHome/artsHome.component';
import ArtsArtist from './artsArtist/artsArtist.component';
import ArtsDisplay from './artsDisplay/artsDisplay.component';

const ArtsView = (props) => {

  return (
    <div className="artsView">
      <Route exact path='/arts' render={routeProps => (
        <ArtsHome
          store={props.store}
          store2={props.store2}
          {...routeProps} />
      )} />
      <Route path='/arts/:artist' render={routeProps => (
        <ArtsArtist
          store={props.store}
          store2={props.store2}
          {...routeProps} />
      )} />
      <Route path='/arts/:artist/:artwork' render={routeProps => (
        <ArtsDisplay
          store={props.store}
          store2={props.store2}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsView;
