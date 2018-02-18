import { Link } from 'react-router-dom'
import './artworkHome.style.scss'

const HomeComponent = (props) => {

  const collections = props.globalStore.collections

  const displayCollections = {
    artists: [],
    eras: []
  }

  for (const key in collections) {
    if (collections[key].type === 'category') {
      displayCollections.eras.push(
        <li key={key}>
          <Link to={`artwork/${key}`} className="listItem">{collections[key].name}</Link>
        </li>
      )
    } else {
      displayCollections.artists.push(
        <li key={key}>
          <Link to={`artwork/${key}`} className="listItem">{collections[key].name.last}</Link>
        </li>
      )
    }
  }

  return (
    <div className="artwork_home">
      <h1>Artwork Home</h1>
      <div>
        <h1>Eras</h1>
        <div className="artwork_eras">
          <ul>{displayCollections.eras}</ul>
        </div>
      </div>
      <div>
        <h1>Artists</h1>
        <div className="artwork_artists">
          <ul>{displayCollections.artists}</ul>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
