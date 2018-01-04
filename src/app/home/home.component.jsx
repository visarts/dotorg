import { Link } from 'react-router-dom';
import './home.style.scss';

const Home = (props) => {
  return (
    <div className="home">
      <h1>The garden of pages and paintings</h1>
      <div className="section">
        <div className="subSection"><Link to="artwork">Artwork</Link></div>
        <div className="subSection"><Link to="literature">Literature</Link></div>
      </div>
    </div>
  );
};

export default Home;
