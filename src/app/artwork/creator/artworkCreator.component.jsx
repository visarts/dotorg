import { Link } from 'react-router-dom';
import './artworkCreator.style.scss';

const Creator = (props) => {

  const creator = props.globalStore.collections[props.globalState.routing.collection];
  const { first, last } = creator.name;

  return (
    <div className="artwork_creator">
      <h1>{first} {last}</h1>
      <div className="section">
        <h2>Gallery</h2>
        <ul>
          {creator.items.map((item, key) => (
            <li key={key}>
              <Link to={`/artwork/${props.globalState.routing.collection}/${item.id}`} className="thumbContainer">
                <img
                  src={`./content/artwork/${props.globalState.routing.collection}/${item.id}_sm.jpg`}
                  className="thumbContainer--image"
                  alt={item.title} />
                {item.name} ({item.id.substring(item.id.lastIndexOf('-') + 1)})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Creator;
