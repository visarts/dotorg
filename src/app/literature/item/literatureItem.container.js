import { Component } from 'react';
import Item from './literatureItem.component';

export default class ItemContainer extends Component {

  render () {
    return (
      <Item {...this.props} />
    );
  }
}
