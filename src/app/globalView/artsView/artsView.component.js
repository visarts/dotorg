import React from 'react';
import { Route } from 'react-router-dom';
import ArtsHome from './artsHome/artsHome.component';
import ArtsArtist from './artsArtist/artsArtist.component';

const ArtsView = (props) => {

  return (
    <div className="artsView">
      <Route exact path='/arts' render={routeProps => (
        <ArtsHome
          store={props.store}
          {...routeProps} />
      )} />
      <Route path='/arts/:artist' render={routeProps => (
        <ArtsArtist
          store={props.store}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsView;
