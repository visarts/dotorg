import { Component } from 'react';
import PortitudeModalComponent from './portitudeModal.component';

export default class PortitudeModal extends Component {

  render () {
    return (
      <PortitudeModalComponent {...this.props} />
    );
  }
}
