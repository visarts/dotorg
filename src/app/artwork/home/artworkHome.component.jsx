import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
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
                headline={collection.name.long}
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
                key={index}
                headline={creator.name.short}
                subHeadline={`${creator.dates[0]} \u2014 ${creator.dates[1]}`}
                primaryText={creator.desc}
                image={{
                  src: `./content/portraits/artists/${creator.id}.jpg`,
                  alt: creator.name.short,
                  default: './content/portraits/profile.jpg'
                }} />
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
