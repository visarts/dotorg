import { Link } from 'react-router-dom';
import Modal from 'material-ui/Modal';
import PortitudeModal from 'common/modal/portitudeModal.container';
import './artworkItem.style.scss';

const ItemComponent = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  const creatorId = item.id.split('-')[0];
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  const url = require(`Artwork/${creatorId}/${item.id}.jpg`);

  return (
    <div className="artwork--item">
      <PortitudeModal
        open={true}
        onClose={hideModal.bind(this)}
        size="lg"
        header={{title: item.name, subtitle: props.globalStore.collections[item.category].name}}>
        <div className="portitudeModal--body">
          <div className="image--container">
            <img
              src={url}
              className="image--large"
              alt={item.title} />
          </div>
        </div>
        <div className="portitudeModal--footer"></div>
      </PortitudeModal>
    </div>
  );
};

export default ItemComponent;
