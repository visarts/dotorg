import { Component } from 'react';
import HomeComponent from './literatureHome.component';

export default class Home extends Component {

  render () {
    return (
      <HomeComponent {...this.props} />
    );
  }
}
