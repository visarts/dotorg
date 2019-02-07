import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import './portitudeModal.style.scss'

/*
  props:
    open: bool,
    onClose: func,
    size: lg, md, sm
    headerTitle: '',
    headerSubTitle: ''

*/

const Transition = props => {
  return <Slide direction="up" {...props} />
}

const ModalComponent = props => {
  const modalClass = props.size ? `portitudeModal--${props.size}` : ''

  return (
    <Dialog
      maxWidth="md"
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}>
      <div className={`portitudeModal ${modalClass}`}>
        {props.children}
      </div>
    </Dialog>
  )
}

export default ModalComponent
