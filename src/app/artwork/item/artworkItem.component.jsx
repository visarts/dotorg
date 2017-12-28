import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import './artworkItem.style.scss';

const Item = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  return (
    <div className="artwork_item">
      <Modal
        show={true}
        onHide={hideModal.bind(this)}
        dialogClassName="artwork_item_modal">
        <Modal.Body>
          <h1>{item.name}</h1>
          <div>{item.category}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Item;
