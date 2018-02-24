import { Component } from 'react'
import artworkService from 'Services/artwork.service'
import ItemComponent from './artworkItem.component'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.item = artworkService.getItemWith(this.props.globalState.routing.collection, this.props.globalState.routing.item)
    this.imagePath = artworkService.getImagePathLg(this.item.creator.id, this.item.id)
    this.hideModal = this.hideModal.bind(this)
  }

  hideModal () {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'))
  }

  render () {
    return (
      <ItemComponent
        {...this.props}
        item={this.item}
        imagePath={this.imagePath}
        hideModal={this.hideModal} />
    )
  }
}
