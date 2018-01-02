import { Link } from 'react-router-dom';
import './home.style.scss';

const Home = (props) => {
  return (
    <div className="home">
      <h1>The portitude home</h1>
      <div className="section">
        <div className="subSection"><Link to="artwork">Artwork</Link></div>
        <div className="subSection"><Link to="literature">Literature</Link></div>
      </div>
      {/*props.globalStore.artwork.items.map((item, key) => (
        <Link to={`/artwork/${item.id.split('-')[0]}/${item.id}`} key={item.id}>
          <ul>
            <li>{item.name}</li>
            <li>{item.id}</li>
          </ul>
        </Link>
      ))*/}
    </div>
  );
};

export default Home;
