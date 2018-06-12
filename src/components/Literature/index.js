import { Route } from 'react-router-dom'
import literatureService from 'Services/literature.service'
import LiteratureHome from './home'
import LiteratureCollection from './collection'
import LiteratureCreator from './creator'
import LiteratureItem from './item'

const Literature = props => {

  return (
    <div className="literature">
      <Route exact path="/literature" render={routeProps => (
        <LiteratureHome {...props} {...routeProps} />
      )} />
      <Route path='/literature/:collection' render={routeProps => {
        const collection = literatureService.getCollection(props.globalState.routing.collection)
        if (collection.type === 'creator') {
          return (<LiteratureCreator {...props} {...routeProps} />)
        } else {
          return (<LiteratureCollection {...props} {...routeProps} />)
        }
      }} />
      <Route path='/literature/:collection/:item' render={routeProps => (
        <LiteratureItem {...props} {...routeProps} />
      )} />
    </div>
  )
}

export default Literature
