import { Link } from 'react-router-dom';
import './home.style.scss';

const Home = (props) => {
  return (
    <div className="home">
      <h1>The portitude home</h1>
      <div><Link to="artwork">Artwork</Link></div>
    </div>
  );
};

export default Home;
