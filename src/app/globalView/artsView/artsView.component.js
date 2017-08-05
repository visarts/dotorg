import React from 'react';
import { Route } from 'react-router-dom';
import ArtsHome from './artsHome/artsHome.component';
import ArtsArtist from './artsArtist/artsArtist.component';

const ArtsView = (props) => {

  return (
    <div className="artsView">
      <Route exact path='/arts' render={routeProps => (
        <ArtsHome
          artistsData={props.artistsData}
          updateCurrent={props.updateCurrent}
          {...routeProps} />
      )} />
      <Route path='/arts/:artist' render={routeProps => (
        <ArtsArtist
          currentArtist={props.artistsData.filter(item => item.artistKey === routeProps.match.params.artist)[0]}
          updateCurrent={props.updateCurrent}
          {...routeProps} />
      )} />
    </div>
  );
};

export default ArtsView;
