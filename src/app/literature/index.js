import { Route } from 'react-router-dom'
import literatureService from 'Services/literature.service'
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
        const collection = literatureService.getCollection(props.globalState.routing.collection)
        if (collection.type === 'creator') {
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
