import { Component } from 'react'
import navigationService from 'Services/navigation.service'
import GlobalHeaderComponent from './globalHeader.component'

export default class GlobalHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationData: navigationService.getNavigationData(this.props.globalState.routing)
    }
  }

  // regrab the nav data every time the routing changes
  componentWillReceiveProps (nextProps) {
    this.setState({navigationData: navigationService.getNavigationData(nextProps.globalState.routing)})
  }

  render () {
    return (
      <GlobalHeaderComponent navigationData={this.state.navigationData} {...this.props} />
    )
  }
}
