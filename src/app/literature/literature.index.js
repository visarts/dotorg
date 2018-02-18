import { Route, Switch } from 'react-router-dom'
import Home from './home/literatureHome.container'
import Collection from './collection/literatureCollection.container'
import Creator from './creator/literatureCreator.container'
import Item from './item/literatureItem.container'

const LiteratureIndex = (props) => {

  return (
    <div className="literature">
      <Route exact path="/literature" render={routeProps => (
        <Home {...props} {...routeProps} />
      )} />
      <Route path='/literature/:collection' render={routeProps => {
        if (props.globalStore.collections[props.globalState.routing.collection].type === 'creator') {
          return (<Creator {...props} {...routeProps} />)
        } else {
          return (<Collection {...props} {...routeProps} />)
        }
      }} />
      <Route path='/literature/:collection/:item' render={routeProps => (
        <Item {...props} {...routeProps} />
      )} />
    </div>
  )
}

export default LiteratureIndex
