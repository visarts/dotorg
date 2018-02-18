import { Link } from 'react-router-dom'
import './literatureCreator.style.scss'

const CreatorComponent = (props) => {

  const creator = props.globalStore.collections[props.globalState.routing.collection]
  const { first, last } = creator.name
  const collections = []

  creator.items.map((item, key) => {
    const collection = props.globalStore.collections[item.category]
    collections[item.category] = collections[item.category] ? collections[item.category] : []

    collections[item.category].push(
      <li key={key} className="listItem">
        <Link to={`/literature/${props.globalState.routing.collection}/${item.id}`}>
          {item.name} ({item.id.substring(item.id.lastIndexOf('-') + 1)})
        </Link>
      </li>
    )
  })

  return (
    <div className="literature_creator">
      <h1>{first} {last}</h1>
      {collections && Object.keys(collections).map((item, key) => (
        <div className="section" key={key}>
          <h2>{props.globalStore.collections[item].name}</h2>
          <ul>{collections[item]}</ul>
        </div>
      ))}
    </div>
  )
}

export default CreatorComponent
