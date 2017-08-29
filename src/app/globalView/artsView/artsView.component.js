import React from 'react';
import { Route } from 'react-router-dom';
import ArtsHome from './artsHome/artsHome.component';
import ArtsArtist from './artsArtist/artsArtist.component';
import ArtsEra from './artsEra/artsEra.component';
import ArtsDisplay from './artsDisplay/artsDisplay.component';

const ArtsView = (props) => {

  return (
    <div className="artsView">
      <Route exact path='/arts' render={routeProps => (
        <ArtsHome
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/arts/g/:era' render={routeProps => (
        <ArtsEra
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/arts/a/:artist' render={routeProps => (
        <ArtsArtist
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/arts/a/:artist/:era/:artwork' render={routeProps => (
        <ArtsDisplay
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/arts/g/:era/:artist/:artwork' render={routeProps => (
        <ArtsDisplay
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsView;
