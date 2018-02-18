import { Link } from 'react-router-dom'
import Favorite from 'material-ui-icons/Favorite'
import './globalHeader.style.scss'

const GlobalHeaderComponent = (props) => {

  return (
    <div className="header">
      <Link to="/">
        <h1><Favorite /> Portitude</h1>
      </Link>
    </div>
  )
}

export default GlobalHeaderComponent
