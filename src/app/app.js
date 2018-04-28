import React from 'react'
import { Route } from 'react-router-dom'

import dataService from 'Services/data.service'
import navigationService from 'Services/navigation.service'

import GlobalHeader from 'global/header'
import GlobalNav from 'global/navigation'
import { Footer } from 'global'

import Home from './home'

import Artwork from './artwork'
import Literature from './literature'

import StyledApp from './app.style'

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.currentLocation = location.hash.slice(1)
    const routing = dataService.getRoutingState(this.currentLocation)
    this.state = {
      routing,
      navigationData: navigationService.getNavigationData(routing)
    }
  }

  updateAppState = newState => {
    this.setState(Object.assign(this.state, newState))
  }

  setGlobalClassName = () => {
    document.body.className = this.state.routing.section || ''
  }

  componentDidMount = () => {
    this.setGlobalClassName()
  }

  // this will update when the route changes and set state with new params
  componentWillReceiveProps = nextProps => {
    const updatedLocation = nextProps.location.pathname
    if (this.currentLocation !== updatedLocation) {
      const routing = dataService.getRoutingState(updatedLocation)
      this.setState({
        routing,
        navigationData: navigationService.getNavigationData(routing)
      }, () => {
        this.currentLocation = updatedLocation
        this.setGlobalClassName()
      })
    }
  }

  render () {

    /* TODO
      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately
          -- could use same category as novels, when those are added, as 'chaptered' content

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      Add middle tier sizing layout for tablets, etc

      Add historical memory for read completion in literature

      refactor arts carousel to use css animation and a single array

      refactor history display into carousel

    */

    return (
      <StyledApp id="portitude">
        <GlobalHeader
          globalState={this.state} />
        <GlobalNav
          globalState={this.state} />
        <div className="view">
          <Route exact path="/" render={routeProps => (
            <Home
              globalState={this.state}
              {...routeProps} />
          )} />
          <Route path="/artwork" render={routeProps => (
            <Artwork
              globalState={this.state}
              {...routeProps} />
          )} />
          <Route path="/literature" render={routeProps => (
            <Literature
              globalState={this.state}
              {...routeProps} />
          )} />
        </div>
        <Footer
          globalState={this.state} />
      </StyledApp>
    )
  }
}
