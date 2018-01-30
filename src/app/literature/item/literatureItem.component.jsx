import { Link } from 'react-router-dom';
import Modal from 'material-ui/Modal';
import './literatureItem.style.scss';

const Item = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  return (
    <div className="literature_item">
      <Modal
        open={true}
        onClose={hideModal.bind(this)}>
        <div className="portitudeModal">
          <h1>{item.name}</h1>
          <div>{props.globalStore.collections[item.category].name}</div>
          <div className="modalContent" dangerouslySetInnerHTML={props.content} />
          <div className="modalFooter">Prev || Next</div>
        </div>
      </Modal>
    </div>
  );
};

export default Item;
