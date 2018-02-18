import Modal from 'material-ui/Modal'
import './portitudeModal.style.scss'

/*
  props:
    open: bool,
    onClose: func,
    size: lg, md, sm
    headerTitle: '',
    headerSubTitle: ''

*/
const PortitudeModalComponent = (props) => {
  const modalClass = props.size ? `portitudeModal--${props.size}` : ''

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}>
      <div className={`portitudeModal ${modalClass}`}>
        {props.children}
      </div>
    </Modal>
  )
}

export default PortitudeModalComponent
