import { Link } from 'react-router-dom';
import './artworkCollection.style.scss';

const Collection = (props) => {

  const collection = props.globalStore.collections[props.globalState.routing.collection];
  const isCategory = collection.type === 'category';

  return (
    <div className="artwork_collection">
      <h1>{ isCategory ? collection.name : collection.name.last }</h1>
      <ul></ul>
    </div>
  );
};

export default Collection;
