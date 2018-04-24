import { Component } from 'react'
import CollectionComponent from './artworkCollection.component'

export default class Collection extends Component {

  render () {
    return (
      <CollectionComponent {...this.props} />
    )
  }
}
