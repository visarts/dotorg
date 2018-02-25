import PortitudeModal from 'common/modal/portitudeModal.container'

import './artworkItem.style.scss'

const ItemComponent = (props) => {

  const item = props.item
  // const collection = item.collection
  // const artist = item.creator

  return (
    <div className="artwork--item">
      <PortitudeModal
        open={true}
        onClose={props.hideModal}
        size="lg">
        <PortitudeModal.Header title={item.name} subtitle={item.name} />
        <PortitudeModal.Body className="portitudeModal--body">
          <div className="image--container">
            <img
              src={props.imagePath}
              className="image--large"
              alt={item.title} />
          </div>
        </PortitudeModal.Body>
        <PortitudeModal.Footer></PortitudeModal.Footer>
      </PortitudeModal>
    </div>
  )
}

export default ItemComponent
