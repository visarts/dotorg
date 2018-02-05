import { Component } from 'react';
import GlobalFooterComponent from './globalFooter.component';

export default class GlobalFooter extends Component {

  render () {
    return (
      <GlobalFooterComponent {...this.props} />
    );
  }
}
