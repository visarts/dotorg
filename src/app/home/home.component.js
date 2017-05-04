import React from 'react';
import './home.component.less';

const Home = (props) => {
  return (
    <div className="homeComponent">
      <div className="navDescription">
        A fantastic collection of artwork by history's greatest artists.
      </div>

      <div className="navDescription">
        Literature by classic authors line the walls of this section.
      </div>

      <div className="mainDescription">
        Immerse yourself in the beauty of artwork and literature from the masters of the genre, and enrich your store of knowledge.
      </div>
    </div>
  );
}

export default Home;
