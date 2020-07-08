import { Route } from 'react-router-dom'
import artworkService from 'Services/artwork.service'
import ArtworkHome from './home'
import ArtworkCollection from './collection'
import ArtworkCreator from './creator'
import ArtworkItem from './item'

const Artwork = props => {
console.log(props)
  return (
    <div className="artwork">
      <Route exact path="/artwork" render={routeProps => (
        <ArtworkHome {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection' render={routeProps => {
        const collection = artworkService.getCollection(props.globalState.routing.collection)
        if (collection.type === 'creator') {
          return (<ArtworkCreator {...props} {...routeProps} />)
        } else {
          return (<ArtworkCollection {...props} {...routeProps} />)
        }
      }} />
      <Route path='/artwork/:collection/:item' render={routeProps => (
        <ArtworkItem {...props} {...routeProps} />
      )} />
    </div>
  )
}

export default Artwork
