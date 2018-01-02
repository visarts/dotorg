import { Component } from 'react';
import GlobalHeader from './globalHeader.component';

export default class GlobalHeaderContainer extends Component {

  render () {
    return (
      <GlobalHeader {...this.props} />
    );
  }
}
