import React from 'react';
import { Link } from 'react-router-dom';
import './artsHome.component.less';

const ArtsHome = (props) => {
  return (
    <div className="artsHomeComponent">
      <div className="section">
        <h1>This is the arts home page</h1>
        These woods are lovely, dark, and deep, but I have promises to keep, and miles to go before I sleep

        <p>
          <Link to="/arts/davinci">DaVinci</Link>
        </p>
      </div>
    </div>
  );
}

export default ArtsHome;
