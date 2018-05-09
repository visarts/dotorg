import { Component } from 'react'
import HeaderComponent from './Header.component'

export default class GlobalHeader extends Component {
  render () {

    return (
      <HeaderComponent navigationState={this.props.globalState.navigationState} {...this.props} />
    )
  }
}
