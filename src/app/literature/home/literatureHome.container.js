import { Component } from 'react';
import Home from './literatureHome.component';

export default class HomeContainer extends Component {

  render () {
    return (
      <Home {...this.props} />
    );
  }
}
