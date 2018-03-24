import { Component } from 'react'
import ImageComponent from './image.component'

class Image extends Component {

  loadDefaultImage = event => {
    event.target.src = (this.props && this.props.default) || ''
  }

  render () {
    return (
      <ImageComponent
        {...this.props}
        loadDefaultImage={this.loadDefaultImage} />
    )
  }
}

export default Image
