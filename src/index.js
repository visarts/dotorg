import './styles/main.scss';
import { Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import dataService from 'Services/data.service';
import App from './app/app';

axios.all([
  dataService.getAllLiterature(),
  dataService.getAllArtwork(),
  dataService.getCollections('artwork'),
  dataService.getItems('artwork'),
  dataService.getCollections('literature'),
  dataService.getItems('literature'),
])
  .then(axios.spread((literature, artwork, artwork_collections, artwork_items, literature_collections, literature_items) => {
    ReactDOM.render((
      <Router>
        <Route path="/" render={routeProps => (
          <App
            data={{literature, artwork}}
            data2={{artwork_collections, artwork_items, literature_collections, literature_items }}
            {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'));
  }));
