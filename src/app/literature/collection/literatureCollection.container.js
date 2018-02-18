import { Component } from 'react'
import CollectionComponent from './literatureCollection.component'

export default class Collection extends Component {

  render () {
    return (
      <CollectionComponent {...this.props} />
    )
  }
}
