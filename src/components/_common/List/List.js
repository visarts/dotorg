import React from 'react'
import ListItem from './ListItem'

function List (props) {
  return (
    <ul>
      {props.children}
    </ul>
  )
}

export default List
export { ListItem }
