import { Component } from 'react'
import GlobalNavComponent from './globalNav.component'

export default class GlobalNav extends Component {

  render () {
    return (
      <GlobalNavComponent {...this.props} />
    )
  }
}
