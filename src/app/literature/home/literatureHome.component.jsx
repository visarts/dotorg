import { Link } from 'react-router-dom'
import './literatureHome.style.scss'

const HomeComponent = (props) => {

  const collections = props.globalStore.collections

  const displayCollections = {
    authors: [],
    genres: []
  }

  for (const key in collections) {
    if (collections[key].type === 'category') {
      displayCollections.genres.push(
        <li key={key} className="listItem">
          <Link to={`literature/${key}`}>{collections[key].name}</Link>
        </li>
      )
    } else {
      displayCollections.authors.push(
        <li key={key} className="listItem">
          <Link to={`literature/${key}`}>{collections[key].name.last}</Link>
        </li>
      )
    }
  }

  return (
    <div className="literature_home">
      <h1>Artwork Home</h1>
      <div>
        <h1>genres</h1>
        <div className="literature_genres">
          <ul>{displayCollections.genres}</ul>
        </div>
      </div>
      <div>
        <h1>authors</h1>
        <div className="literature_authors">
          <ul>{displayCollections.authors}</ul>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
