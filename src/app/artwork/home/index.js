import { Component } from 'react'
import HomeComponent from './artworkHome.component'

export default class Home extends Component {

  render () {
    return (
      <HomeComponent {...this.props} />
    )
  }
}
