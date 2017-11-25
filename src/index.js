
import { Route, HashRouter as Router } from 'react-router-dom';
import dataService from 'Services/data.service';
import App from './app/app';

let authorsData = dataService.getAllAuthorsData();
let artistsData = dataService.getAllArtistsData();
let data = { authorsData, artistsData };

ReactDOM.render((
  <Router>
    <Route path="/" render={routeProps => (
      <App data={data} {...routeProps} />
    )} />
  </Router>
), document.querySelector('app'));
