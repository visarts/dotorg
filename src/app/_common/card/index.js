import { Component } from 'react'
import CardComponent from './card.component'


class Card extends Component {

  render () {
    return (
      <CardComponent
        {...this.props} />
    )
  }
}

export default Card
