import { Component } from 'react';
import Collection from './literatureCollection.component';

export default class CollectionContainer extends Component {

  render () {
    return (
      <Collection {...this.props} />
    );
  }
}
