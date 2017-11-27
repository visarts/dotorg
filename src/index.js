
import { Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import dataService from 'Services/data.service';
import App from './app/app';

const authorsData = dataService.getAllAuthorsData();
const artistsData = dataService.getAllArtistsData();
const data = { authorsData, artistsData };

axios.all([dataService.getAllAuthorsData(), dataService.getAllArtistsData()])
  .then(axios.spread((authors, artists) => {
    ReactDOM.render((
      <Router>
        <Route path="/" render={routeProps => (
          <App data={{authors, artists}} {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'));
  }));
