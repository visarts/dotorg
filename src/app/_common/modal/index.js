import { Component } from 'react'
import ModalComponent from './modal.component'
import ModalHeader from './modalHeader.component'
import ModalBody from './modalBody.component'
import ModalFooter from './modalFooter.component'


class Modal extends Component {

  render () {
    return (
      <ModalComponent
        {...this.props} />
    )
  }
}
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
