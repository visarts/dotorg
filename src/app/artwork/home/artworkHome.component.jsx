import { Link } from 'react-router-dom';
import './artworkHome.style.scss';

const Home = (props) => {

  return (
    <div className="artwork_home">
      <h1>Artwork Home</h1>
      <div>
        <h1>Eras</h1>
        <div className="artwork_eras">
          {props.globalStore.collections.map(collection => {
            return collection.type === 'category' && (
              <div key={collection.id}>
                <Link to={`/artwork/${collection.id}`}>{collection.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Artists</h1>
        <div className="artwork_artists">
          {props.globalStore.collections.map(collection => {
            return collection.type === 'creator' && (
              <div key={collection.id}>
                <Link to={`/artwork/${collection.id}`}>{collection.name.last}, {collection.name.first || ''}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
