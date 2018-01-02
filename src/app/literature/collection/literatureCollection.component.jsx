import { Link } from 'react-router-dom';
import './literatureCollection.style.scss';

const Collection = (props) => {

  const collection = props.globalStore.collections[props.globalState.routing.collection];

  return (
    <div className="literature_collection">
      <h1>{collection.name}</h1>
      <ul>
        {collection.items.map((item, key) => (
          <li key={key}>
            <Link to={`/literature/${props.globalState.routing.collection}/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collection;
