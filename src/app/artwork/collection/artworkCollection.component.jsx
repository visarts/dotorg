import { Link } from 'react-router-dom';
import './artworkCollection.style.scss';

const Collection = (props) => {

  const collection = props.globalStore.collections.filter(collection => collection.id === props.globalState.routing.collection)[0];

  // to get the items list for this collection we first check if the collection is a genre, and
  //    try to match the genre id with the item category
  // otherwise, we check if this is a creator collection, and if so, check for the creator name on the item ID
  const items = props.globalStore.items.filter(item => {
    const itemId = item.id.split('-');
    if (collection.type === 'category' && item.category === collection.id) {
      item.creator = props.globalStore.collections.filter(collection => collection.id === itemId[0])[0];
      item.date = itemId[itemId.length - 1] || '';
      return true;
    } else if (collection.type === 'creator' && itemId[0] === collection.id) {
      item.category = props.globalStore.collections.filter(collection => collection.id === item.category)[0];
      item.date = itemId[itemId.length - 1] || '';
      return true;
    }
  });
console.log(items);
  return (
    <div className="artwork_collection">
      <h1>{collection.type === 'category' ? collection.name : collection.name.last}</h1>
      <div className="collection_desc">
        {collection.desc}
      </div>
      <div className="collection_items">
        {collection.type === 'category' && items.map(item => (
          <ul key={item.id}>
            <li><Link to={`/artwork/${item.creator.id}/${item.id}`}><img src={`./content/artwork/${item.creator.id}/${item.id}_sm.jpg`} /></Link></li>
            <li>Name: {item.name}</li>
            <li>Date: {item.date}</li>
            <li>Artist: {item.creator.name.last}</li><br />
          </ul>
        ))}
        {collection.type === 'creator' && items.map(item => (
          <ul key={item.id}>
            <li><Link to={`/artwork/${collection.id}/${item.id}`}><img src={`./content/artwork/${collection.id}/${item.id}_sm.jpg`} /></Link></li>
            <li>Name: {item.name}</li>
            <li>Date: {item.date}</li>
            <li>Era: {item.category.name}</li><br />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Collection;
