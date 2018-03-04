import _ from 'lodash'
import { List, ListItem } from 'common/list/list.container'
import Typography from 'common/typography/typography.container'
import artworkService from 'Services/artwork.service'
import './artworkHome.style.scss'

const HomeComponent = (/* props */) => {

  const collections = artworkService.getAllCollectionsMetaData()
  const creators = artworkService.getAllCreatorsMetaData()

  return (
    <div className="artwork_home">
      <div>
        <Typography type="subtitle">Eras</Typography>
        <div className="artwork_eras">
          <List>
            {_.map(collections, (collection, index) => (
              <ListItem
                to={artworkService.getCollectionPath(collection.id)}
                primaryText={collection.name}
                key={index} />
            ))}
          </List>
        </div>
      </div>
      <div>
        <Typography type="subtitle">Artists</Typography>
        <div className="artwork_artists">
          <List>
            {_.map(creators, (creator, index) => (
              <ListItem
                to={artworkService.getCollectionPath(creator.id)}
                primaryText={creator.name.last}
                key={index} />
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
