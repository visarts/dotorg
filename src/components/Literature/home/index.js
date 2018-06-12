import _ from 'lodash'
import {
  List,
  ListItem,
  Typography,
} from 'common'
import literatureService from 'Services/literature.service'

const LiteratureHome = props => {

  const collections = literatureService.getAllCollectionsMetaData()
  const creators = literatureService.getAllCreatorsMetaData()

  return (
    <div className="literature_home">
      <div>
        <Typography type="subtitle">Genres</Typography>
        <div className="literature_genres">
          <List>
            {_.map(collections, (collection, index) => (
              <ListItem
                to={literatureService.getCollectionPath(collection.id)}
                headline={collection.name.short}
                key={index} />
            ))}
          </List>
        </div>
      </div>
      <div>
        <Typography type="subtitle">Authors</Typography>
        <div className="literature_authors">
          <List>
            {_.map(creators, (creator, index) => (
              <ListItem
                to={literatureService.getCollectionPath(creator.id)}
                key={index}
                headline={creator.name.short}
                subHeadline={`${creator.dates[0]} \u2014 ${creator.dates[1]}`}
                primaryText={creator.desc}
                image={{
                  src: `./content/portraits/authors/${creator.id}.jpg`,
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

export default LiteratureHome
