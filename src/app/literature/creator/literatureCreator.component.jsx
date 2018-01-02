import { Link } from 'react-router-dom';
import './literatureCreator.style.scss';

const Creator = (props) => {

  const creator = props.globalStore.collections[props.globalState.routing.collection];

  return (
    <div className="literature_creator">
      <h1>{creator.name.last}</h1>
      <ul>
        {creator.items.map((item, key) => (
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

export default Creator;
