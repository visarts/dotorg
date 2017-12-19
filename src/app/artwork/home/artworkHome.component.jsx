import { Link } from 'react-router-dom';
import './artworkHome.style.scss';

const Home = (props) => {

  const collections = props.globalStore.collections;

  const artCollections = {
    artists: [],
    eras: []
  };

  for (const key in collections) {
    if (collections[key].type === 'category') {
      artCollections.eras.push(
        <li key={key}>
          <Link to={`artwork/${key}`}>{collections[key].name}</Link>
        </li>
      );
    } else {
      artCollections.artists.push(
        <li key={key}>
          <Link to={`artwork/${key}`}>{collections[key].name.last}</Link>
        </li>
      );
    }
  }

  return (
    <div className="artwork_home">
      <h1>Artwork Home</h1>
      <div>
        <h1>Eras</h1>
        <div className="artwork_eras">
          <ul>{artCollections.eras}</ul>
        </div>
      </div>
      <div>
        <h1>Artists</h1>
        <div className="artwork_artists">
          <ul>{artCollections.artists}</ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
