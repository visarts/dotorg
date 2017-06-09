import React from 'react';
import { Route } from 'react-router-dom';
import ArtsHome from './artsHome/artsHome.component';
import ArtsArtist from './artsArtist/artsArtist.component';
import ArtsDisplay from './artsDisplay/artsDisplay.component';


const ArtsView = (props) => {

  return (
    <div className="artsView">
      <Route exact path='/arts' render={defaultProps => (
        <ArtsHome
          artistsData={props.artistsData}
          {...defaultProps} />
      )} />
      <Route exact path='/arts/:artist' render={defaultProps => (
        <ArtsArtist
          currentArtist={props.artistsData.filter(item => item.artistKey === defaultProps.match.params.artist)[0]}
          {...defaultProps} />
      )} />
    </div>
  );
};

export default ArtsView;
