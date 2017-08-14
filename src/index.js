
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import App from './app/app';

const Main = () => {
  return (
    <Router>
      <Route path="/" render={routeProps => (
        <App {...routeProps} />
      )} />
    </Router>
  )
}
ReactDOM.render(<Main />,  document.querySelector('app'));
