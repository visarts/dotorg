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
        <Route exact path='/literature' render={defaultProps => (
          <LiteratureHome
            authorsData={this.props.authorsData}
            {...defaultProps} />
        )} />
        <Route path='/literature/:author' render={defaultProps => (
          <LiteratureAuthor
            currentAuthor={this.props.authorsData.filter(item => item.authorKey === defaultProps.match.params.author)[0]}
            {...defaultProps} />
        )} />
        <Route path='/literature/:author/:work' render={defaultProps => (
          <LiteratureDisplay
            currentAuthor={this.props.authorsData.filter(item => item.authorKey === defaultProps.match.params.author)[0]}
            {...defaultProps} />
        )} />
      </div>
    );
  }
}
