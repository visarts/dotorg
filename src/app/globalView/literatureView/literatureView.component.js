import React from 'react';
import { Route } from 'react-router-dom';
import LiteratureHome from './literatureHome/literatureHome.component';
import LiteratureAuthor from './literatureAuthor/literatureAuthor.component';
import LiteratureDisplay from './literatureDisplay/literatureDisplay.component';

export default class LiteratureView extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="literatureView">
        <Route exact path='/literature' render={routeProps => (
          <LiteratureHome
            authorsData={this.props.authorsData}
            {...routeProps} />
        )} />
        <Route path='/literature/:author' render={routeProps => (
          <LiteratureAuthor
            currentAuthor={this.props.authorsData.filter(item => item.authorKey === routeProps.match.params.author)[0]}
            {...routeProps} />
        )} />
        <Route path='/literature/:author/:work' render={routeProps => (
          <LiteratureDisplay
            currentAuthor={this.props.authorsData.filter(item => item.authorKey === routeProps.match.params.author)[0]}
            {...routeProps} />
        )} />
      </div>
    );
  }
}
