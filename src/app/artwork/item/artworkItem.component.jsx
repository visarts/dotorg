import { Link } from 'react-router-dom';
import Modal from 'material-ui/Modal';
import './artworkItem.style.scss';

const Item = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  const creatorId = item.id.split('-')[0];
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  return (
    <div className="artwork--item">
      <Modal
        open={true}
        onClose={hideModal.bind(this)}>
        <div className="portitudeModal">
          <div className="portitudeModal--header">
            <h1>{item.name}</h1>
            <div>{props.globalStore.collections[item.category].name}</div>
          </div>
          <div className="portitudeModal--body">
            <div className="image--container">
              <img
                src={`./content/artwork/${creatorId}/${item.id}.jpg`}
                className="image--large"
                alt={item.title} />
            </div>
          </div>
          <div className="portitudeModal--footer"></div>
        </div>
      </Modal>
    </div>
  );
};

export default Item;
