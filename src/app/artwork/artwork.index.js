import { Route, Switch } from 'react-router-dom';
import HomeContainer from './home/artworkHome.container';
import CollectionContainer from './collection/artworkCollection.container';
import ItemContainer from './item/artworkItem.container';

const ArtworkIndex = (props) => {

  return (
    <div className="artwork">
      <Route exact path="/artwork" render={routeProps => (
        <HomeContainer {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection' render={routeProps => (
        <CollectionContainer {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection/:item' render={routeProps => (
        <ItemContainer {...props} {...routeProps} />
      )} />
    </div>
  );
};

export default ArtworkIndex;
