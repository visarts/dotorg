import { Route, Switch } from 'react-router-dom';
import HomeContainer from './home/artworkHome.container';
import CollectionContainer from './collection/artworkCollection.container';

const ArtworkIndex = (props) => {

  return (
    <div className="artwork">
      <Route exact path="/artwork" render={routeProps => (
        <HomeContainer {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection' render={routeProps => (
        <CollectionContainer {...props} {...routeProps} />
      )} />
    </div>
  );
};

export default ArtworkIndex;
