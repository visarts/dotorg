import { Route } from 'react-router-dom'
import artworkService from 'Services/artwork.service'
import Home from './home'
import Collection from './collection'
import Creator from './creator'
import Item from './item'

const Artwork = props => {

  return (
    <div className="artwork">
      <Route exact path="/artwork" render={routeProps => (
        <Home {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection' render={routeProps => {
        const collection = artworkService.getCollection(props.globalState.routing.collection)
        if (collection.type === 'creator') {
          return (<Creator {...props} {...routeProps} />)
        } else {
          return (<Collection {...props} {...routeProps} />)
        }
      }} />
      <Route path='/artwork/:collection/:item' render={routeProps => (
        <Item {...props} {...routeProps} />
      )} />
    </div>
  )
}

export default Artwork
