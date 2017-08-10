import React from 'react';
import { Route } from 'react-router-dom';
import LiteratureHome from './literatureHome/literatureHome.component';
import LiteratureAuthor from './literatureAuthor/literatureAuthor.component';

const LiteratureView = (props) => {
  //currentAuthor={props.authorsData.filter(item => item.authorKey === routeProps.match.params.author)[0]}
  return (
    <div className="literatureView">
      <Route exact path='/literature' render={routeProps => (
        <LiteratureHome
          authorsData={props.authorsData}
          updateStore={props.updateStore}
          store={props.store}
          {...routeProps} />
      )} />
      <Route path='/literature/:author' render={routeProps => (
        <LiteratureAuthor
          updateStore={props.updateStore}
          updateCurrentAuthor={props.updateCurrentAuthor}
          store={props.store}
          {...routeProps} />
      )} />
    </div>
  );
};

export default LiteratureView
