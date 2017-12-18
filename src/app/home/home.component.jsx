import { Link } from 'react-router-dom';
import './home.style.scss';

const Home = (props) => {
  return (
    <div className="home">
      <h1>The portitude home</h1>
      <div><Link to="artwork">Artwork</Link></div>
      {props.globalStore.artwork.items.map((item, key) => (
        <ul key={key}>
          <li>{item.name}</li>
          <li>{item.id}</li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
