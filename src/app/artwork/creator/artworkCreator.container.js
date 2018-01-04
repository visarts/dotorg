import { Component } from 'react';
import Creator from './artworkCreator.component';

export default class CreatorContainer extends Component {

  render () {
    return (
      <Creator {...this.props} />
    );
  }
}
