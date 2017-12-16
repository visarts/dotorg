import './artworkCollection.style.scss';

const Collection = (props) => {

  const collection = props.globalStore.collections.filter(collection => collection.id === props.globalState.routing.collection)[0];

  // to get the items list for this collection we first check if the collection is a genre, and
  //    try to match the genre id with the item category
  // otherwise, we check if this is a creator collection, and if so, check for the creator name on the item ID
  const items = props.globalStore.items.filter(item => {
    const itemId = item.id.split('-');
    if (collection.type === 'category' && item.category === collection.id) {
      item.creator = itemId[0];
      item.date = itemId[itemId.length - 1] || '';
      return true;
    } else if (collection.type === 'creator' && itemId[0] === collection.id) {
      const itemCreator = itemId[0];
      const itemDate = itemId[itemId.length - 1] || '';
      return { item, itemCreator, itemDate };
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
          <div key={item.id}>
            <span>Artist: {props.globalStore.collections.filter(collection => collection.id === item.creator)[0].name.last}</span><br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
