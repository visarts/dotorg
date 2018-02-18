import { Component } from 'react'
import CreatorComponent from './literatureCreator.component'

export default class Creator extends Component {

  render () {
    return (
      <CreatorComponent {...this.props} />
    )
  }
}
