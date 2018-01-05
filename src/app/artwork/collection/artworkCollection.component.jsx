import { Link } from 'react-router-dom';
import './artworkCollection.style.scss';

const Collection = (props) => {

  const collection = props.globalStore.collections[props.globalState.routing.collection];
  const creators = {};

  collection.items.map((item, key) => {
    const creatorId = item.id.split('-')[0];
    const creator = props.globalStore.collections[creatorId];
    creators[creatorId] = creators[creatorId] ? creators[creatorId] : [];

    creators[creatorId].push(
      <li key={key}>
        <Link to={`/artwork/${props.globalState.routing.collection}/${item.id}`} className="thumbContainer">
          <img
            src={`./content/artwork/${creatorId}/${item.id}_sm.jpg`}
            className="thumbContainer--image"
            alt={item.title} />
          {item.name} ({item.id.substring(item.id.lastIndexOf('-') + 1)})
        </Link>
      </li>
    );
  });

  return (
    <div className="artwork_collection">
      <h1>{collection.name}</h1>
      {creators && Object.keys(creators).map((item, key) => (
        <div className="section" key={key}>
          <h2>{props.globalStore.collections[item].name.last}</h2>
          <ul>{creators[item]}</ul>
        </div>
      ))}
    </div>
  );
};

export default Collection;
