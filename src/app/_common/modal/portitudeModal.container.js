import { Component } from 'react'
import PortitudeModalComponent from './portitudeModal.component'
import ModalHeader from './modalHeader.component'
import ModalBody from './modalBody.component'
import ModalFooter from './modalFooter.component'


class PortitudeModal extends Component {

  render () {
    return (
      <PortitudeModalComponent
        {...this.props} />
    )
  }
}
PortitudeModal.Header = ModalHeader
PortitudeModal.Body = ModalBody
PortitudeModal.Footer = ModalFooter

export default PortitudeModal
