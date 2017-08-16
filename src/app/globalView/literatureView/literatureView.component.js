import React from 'react';
import { Route } from 'react-router-dom';
import LiteratureHome from './literatureHome/literatureHome.component';
import LiteratureAuthor from './literatureAuthor/literatureAuthor.component';

const LiteratureView = (props) => {
  return (
    <div className="literatureView">
      <Route exact path='/literature' render={routeProps => (
        <LiteratureHome
          store={props.store}
          {...routeProps} />
      )} />
      <Route path='/literature/:author' render={routeProps => (
        <LiteratureAuthor
          store={props.store}
          {...routeProps} />
      )} />
    </div>
  );
};

export default LiteratureView
