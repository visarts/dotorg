import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './globalNav.component.less';

const GlobalNav = (props) => {

  const selectedSection = location.hash.includes('/literature') ? 'litSelected' : location.hash.includes('/arts') ? 'artSelected' : '';
  const litSelected = location.hash.includes('/literature') ? 'selected' : 'unselected';
  const artSelected = location.hash.includes('/arts') ? 'selected' : 'unselected';
  const subPage = location.hash === '#/' ? '' : 'subPage';
  const bannerImg = litSelected === 'selected' ? './images/litp.jpg' : './images/frontp.jpg';

  return (
    <nav className={`globalNav ${selectedSection}`}>

      <div className="globalContainer">
      <div className="frontp">
        {/* <img src={bannerImg} />*/}
      </div>
      <Link to='/literature'>
        <div className="navDescription">
          <div className={`navImage navLit ${subPage}`}>
            <div className="navTitle">
              <h3 className="title">{/*<Glyphicon glyph="book" className="icon" />*/}The Library</h3>
              <span className={`desc ${subPage}`}>Literature by classic authors line the walls of this section.</span>
            </div>
          </div>

        </div>
      </Link>
      <Link to='/arts'>
        <div className="navDescription">
          <div className={`navImage navArt ${subPage}`}>
            <div className="navTitle">
              <h3 className="title">{/*<Glyphicon glyph="tint" className="icon" />*/}The Gallery</h3>
              <span className={`desc ${subPage}`}>A fantastic collection of artwork by history's greatest artists.</span>
            </div>
          </div>
        </div>
      </Link>
      </div>
    </nav>
  );
};

export default GlobalNav;
