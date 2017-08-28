
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import dataService from 'Services/data.service';
import App from './app/app';



/*const Main = (props) => {
  return (
    <Router>
      <Route path="/" render={routeProps => (
        <App data={props.data} {...routeProps} />
      )} />
    </Router>
  )
}*/

// run the async call to get the json then feed it into the top component as a prop
dataService.getAllAuthorsData().then((authorsData) => {
  dataService.getAllArtistsData().then((artistsData) => {
    let data = {authorsData, artistsData};
    //ReactDOM.render(<App data={data} />,  document.querySelector('app'));
    ReactDOM.render((
      <Router>
        <Route path="/" render={routeProps => (
          <App data={data} {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'));
  });
});
