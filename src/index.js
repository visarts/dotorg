import './styles/main.scss';
import { Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import dataService from 'Services/data.service';
import App from './app/app';

axios.all([dataService.getAllLiterature(), dataService.getAllArtwork()])
  .then(axios.spread((literature, artwork) => {
    ReactDOM.render((
      <Router>
        <Route path="/" render={routeProps => (
          <App data={{literature, artwork}} {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'));
  }));
