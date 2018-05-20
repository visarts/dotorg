import { Component } from 'react'
import ListComponent from './list.component'
import ListItem from './ListItem'

class List extends Component {
  render () {
    return (
      <ListComponent {...this.props}>
        {this.props.children}
      </ListComponent>
    )
  }
}

export default List
export { ListItem }
