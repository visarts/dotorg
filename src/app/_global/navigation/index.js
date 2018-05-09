import { Component } from 'react'
import GlobalNavComponent from './globalNav.component'

export default class GlobalNav extends Component {

  render () {
    return (
      <GlobalNavComponent navigation={this.props.globalState.navigation} {...this.props} />
    )
  }
}
