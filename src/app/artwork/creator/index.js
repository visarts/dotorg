import { Component } from 'react'
import CreatorComponent from './artworkCreator.component'

export default class Creator extends Component {

  render () {
    return (
      <CreatorComponent {...this.props} />
    )
  }
}
