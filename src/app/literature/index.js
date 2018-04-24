import { Route } from 'react-router-dom'
import literatureService from 'Services/literature.service'
import Home from './home'
import Collection from './collection'
import Creator from './creator'
import Item from './item'

const Literature = props => {

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

export default Literature
