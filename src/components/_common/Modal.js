import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { Typography } from 'common'


// import './portitudeModal.style.scss'

const Transition = props => {
  return <Slide direction="up" {...props} />
}

const ModalHeader = props => {

  return (
    <div className="portitudeModal--header">
      <Typography type="title" className="nomargin">{props.title || ''}</Typography>
      <Typography type="subtitle">{props.subtitle || ''}</Typography>
    </div>
  )
}

const ModalBody = props => {

  return (
    <div className={`portitudeModal--body ${props.fullHeight ? 'portitudeModal--body-full' : ''}`}>
      {props.children}
    </div>
  )
}

const ModalFooter = props => {

  return (
    <div className="portitudeModal--footer">
      {props.children}
    </div>
  )
}

function Modal ({ open, onClose, size, children }) {
  const modalClass = size ? `portitudeModal--${size}` : ''

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}>
      <div className={`portitudeModal ${modalClass}`}>
        {children}
      </div>
    </Dialog>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
