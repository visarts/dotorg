import { Route, Switch } from 'react-router-dom'
import Home from './home/artworkHome.container'
import Collection from './collection/artworkCollection.container'
import Creator from './creator/artworkCreator.container'
import Item from './item/artworkItem.container'

const ArtworkIndex = (props) => {

  return (
    <div className="artwork">
      <Route exact path="/artwork" render={routeProps => (
        <Home {...props} {...routeProps} />
      )} />
      <Route path='/artwork/:collection' render={routeProps => {
        if (props.globalStore.collections[props.globalState.routing.collection].type === 'creator') {
          return (<Creator {...props} {...routeProps} />)
        } else {
          return (<Collection {...props} {...routeProps} />)
        }
      }}  />
      <Route path='/artwork/:collection/:item' render={routeProps => (
        <Item {...props} {...routeProps} />
      )} />
    </div>
  )
}

export default ArtworkIndex
