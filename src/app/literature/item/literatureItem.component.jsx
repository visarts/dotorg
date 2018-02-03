import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import './literatureItem.style.scss';

const Item = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  // create a portitude modal component that has all this functional stuff built in
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  return (
    <div className="literature_item">
      <Modal
        open={true}
        onClose={hideModal.bind(this)}>
        <div className="portitudeModal">
          <div className="portitudeModal--header">
            <h1>{item.name}</h1>
            <div>{props.globalStore.collections[item.category].name}</div>
          </div>
          <div className="portitudeModal--body">
            <div className="modalContent" dangerouslySetInnerHTML={{__html: props.content}} />
          </div>
          <div className="portitudeModal--footer">
            <Button className="pagination--button" color="primary" raised onClick={props.setPreviousPage} disabled={props.isFirstPage}>Previous</Button>
            <span style={{padding: '10px'}}>{props.currentPage + 1}</span>
            <Button className="pagination--button" color="primary" raised onClick={props.setNextPage} disabled={props.isLastPage}>Next</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Item;
