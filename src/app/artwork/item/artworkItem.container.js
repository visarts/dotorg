import { Component } from 'react'
import ItemComponent from './artworkItem.component'

export default class Item extends Component {

  render () {
    return (
      <ItemComponent {...this.props} />
    )
  }
}
