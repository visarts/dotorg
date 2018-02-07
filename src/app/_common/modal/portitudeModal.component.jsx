import Modal from 'material-ui/Modal';
import './portitudeModal.style.scss';

/*
  props:
    open: bool,
    onClose: func,
    size: lg, md, sm
    headerTitle: '',
    headerSubTitle: ''

*/
const PortitudeModalComponent = (props) => {
  const modalClass = props.size ? `portitudeModal--${props.size}` : '';

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}>
      <div className={`portitudeModal ${modalClass}`}>
        <div className="portitudeModal--header">
          <h1>{props.header.title}</h1>
          <div>{props.header.subtitle}</div>
        </div>
        <div className="portitudeModal--body">
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default PortitudeModalComponent;
