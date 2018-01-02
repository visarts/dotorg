import { Component } from 'react';
import Creator from './literatureCreator.component';

export default class CreatorContainer extends Component {

  render () {
    return (
      <Creator {...this.props} />
    );
  }
}
