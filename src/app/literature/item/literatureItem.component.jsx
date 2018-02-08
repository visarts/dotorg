import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import PortitudeModal from 'common/modal/portitudeModal.container';
import './literatureItem.style.scss';

const ItemComponent = (props) => {

  const item = props.globalStore.items.find(item => item.id === props.globalState.routing.item);
  const authorId = item.id.split('-')[0];
  const collectionName = props.globalStore.collections[item.category].name;
  const author = props.globalStore.collections[authorId];
  // create a portitude modal component that has all this functional stuff built in
  const hideModal = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'));
  };

  const totalDisplayPages = props.pages.length;
  const currentDisplayPage = props.currentPage + 1;

  return (
    <div className="literature_item">
      <PortitudeModal
        open={true}
        onClose={hideModal.bind(this)}
        size="md"
        header={{title: item.name, subtitle: `${author.name.first} ${author.name.last}`}}>
        <div className="portitudeModal--body">
          <div className="modalContent" dangerouslySetInnerHTML={{__html: props.pages[props.currentPage]}} />
        </div>
        <div className="portitudeModal--footer">
          {totalDisplayPages > 1 &&
            <div className="pagination">
              <Button className="pagination--button" color="primary" raised onClick={props.setPreviousPage} disabled={props.currentPage === 0}><KeyboardArrowLeft /></Button>
              <span className="pagination--marker">{currentDisplayPage} / {totalDisplayPages}</span>
              <Button className="pagination--button" color="primary" raised onClick={props.setNextPage} disabled={props.currentPage === totalDisplayPages - 1}><KeyboardArrowRight /></Button>
            </div>
          }
        </div>
      </PortitudeModal>
    </div>
  );
};

export default ItemComponent;
