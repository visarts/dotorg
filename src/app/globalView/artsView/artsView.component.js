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
          artistsData={props.artistsData}
          {...routeProps} />
      )} />
      <Route exact path='/arts/:artist' render={routeProps => (
        <ArtsArtist
          currentArtist={props.artistsData.filter(item => item.artistKey === routeProps.match.params.artist)[0]}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsView;
