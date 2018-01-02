import { Component } from 'react';
import GlobalNav from './globalNav.component';

export default class GlobalNavContainer extends Component {

  render () {
    return (
      <GlobalNav {...this.props} />
    );
  }
}
