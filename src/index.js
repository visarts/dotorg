import './styles/index.scss'
import { Route, HashRouter as Router } from 'react-router-dom'
import axios from 'axios'
import dataService from 'Services/data.service'
import storeService from 'Services/store.service'
import App from './app/app'

dataService.getAllData()
  .then(response => {
    storeService.setStore(response)
    ReactDOM.render((
      <Router>
        <Route path="/" render={routeProps => (
          <App {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'))
  })
