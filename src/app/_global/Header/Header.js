import { Component } from 'react'
import HeaderComponent from './Header.component'

export default class GlobalHeader extends Component {
  render () {

    return (
      <HeaderComponent navigationData={this.props.globalState.navigationData} {...this.props} />
    )
  }
}
