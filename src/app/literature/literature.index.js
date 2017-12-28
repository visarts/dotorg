import { Route, Switch } from 'react-router-dom';
import HomeContainer from './home/literatureHome.container';
import CollectionContainer from './collection/literatureCollection.container';
import ItemContainer from './item/literatureItem.container';

const LiteratureIndex = (props) => {

  return (
    <div className="literature">
      <Route exact path="/literature" render={routeProps => (
        <HomeContainer {...props} {...routeProps} />
      )} />
      <Route path='/literature/:collection' render={routeProps => (
        <CollectionContainer {...props} {...routeProps} />
      )} />
      <Route path='/literature/:collection/:item' render={routeProps => (
        <ItemContainer {...props} {...routeProps} />
      )} />
    </div>
  );
};

export default LiteratureIndex;
