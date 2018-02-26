import { Component } from 'react'
import dataService from 'Services/data.service'
import GlobalHeaderComponent from './globalHeader.component'

export default class GlobalHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationData: dataService.getNavigationData(this.props.globalState.routing)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({navigationData: dataService.getNavigationData(nextProps.globalState.routing)})
  }

  render () {
    return (
      <GlobalHeaderComponent navigationData={this.state.navigationData} {...this.props} />
    )
  }
}
