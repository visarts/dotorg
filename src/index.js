import './styles/index.scss'
import { render } from 'react-dom'
import { Route, HashRouter as Router } from 'react-router-dom'
import dataService from 'Services/data.service'
import storeService from 'Services/store.service'
import App from './app/app'

dataService.getAllData()
  .then(response => {
    storeService.setStore(response)
    render((
      <Router>
        <Route path="/" render={routeProps => (
          <App {...routeProps} />
        )} />
      </Router>
    ), document.querySelector('app'))
  })
