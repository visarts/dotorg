import { Link } from 'react-router-dom';
import './literatureCreator.style.scss';

const Creator = (props) => {

  const creator = props.globalStore.collections[props.globalState.routing.collection];
  const collections = [];

  creator.items.map((item, key) => {
    const collection = props.globalStore.collections[item.category];
    collections[item.category] = collections[item.category] ? collections[item.category] : [];

    collections[item.category].push(
      <li key={key}>
        <Link to={`/literature/${props.globalState.routing.collection}/${item.id}`}>
          {item.name}
        </Link>
      </li>
    );
  });

  return (
    <div className="literature_creator">
      <h1>{creator.name.last}</h1>
      {collections && Object.keys(collections).map((item, key) => (
        <div className="section" key={key}>
          <h2>{props.globalStore.collections[item].name}</h2>
          <ul>{collections[item]}</ul>
        </div>
      ))}
      {/* <ul>
        {creator.items.map((item, key) => (
          <li key={key}>
            <Link to={`/literature/${props.globalState.routing.collection}/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Creator;
