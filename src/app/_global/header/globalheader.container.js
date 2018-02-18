import { Component } from 'react'
import GlobalHeaderComponent from './globalHeader.component'

export default class GlobalHeader extends Component {

  render () {
    return (
      <GlobalHeaderComponent {...this.props} />
    )
  }
}
