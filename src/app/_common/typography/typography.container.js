import { Component } from 'react'
import TypographyComponent from './typography.component'


class Typography extends Component {

  render () {
    return (
      <TypographyComponent
        {...this.props} />
    )
  }
}

export default Typography
