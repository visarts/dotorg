// this contains all the logic for the home view and renders the home component itself
// whether they have state or not, all containers will be classes
import { Component } from 'react';
import Home from './home.component';

export default class HomeContainer extends Component {

  render () {
    return (
      <Home {...this.props} />
    );
  }
}
