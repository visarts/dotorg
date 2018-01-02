import { Component } from 'react';
import GlobalFooter from './globalFooter.component';

export default class GlobalFooterContainer extends Component {

  render () {
    return (
      <GlobalFooter {...this.props} />
    );
  }
}
