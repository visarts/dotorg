import { Component } from 'react'
import ListComponent from './list.component'
import ListItemComponent from './listItem.component'

class List extends Component {
  render () {
    return (
      <ListComponent {...this.props}>
        {this.props.children}
      </ListComponent>
    )
  }
}

class ListItem extends Component {
  render () {
    return (
      <ListItemComponent {...this.props} />
    )
  }
}

export { List, ListItem }
