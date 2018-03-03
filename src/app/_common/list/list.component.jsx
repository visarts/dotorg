import './list.style.scss'

const ListComponent = props => {
  return (
    <ul className="list">
      {...props.children}
    </ul>
  )
}

export default ListComponent
