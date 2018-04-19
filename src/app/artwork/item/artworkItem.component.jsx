import Modal from 'common/modal'

import './artworkItem.style.scss'

const ItemComponent = (props) => {

  const item = props.item
  // const collection = item.collection
  const creator = item.creator

  return (
    <div className="artwork--item">
      <Modal
        open={true}
        onClose={props.hideModal}
        size="lg">
        <Modal.Header title={item.name} subtitle={`${creator.name.first} ${creator.name.last}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
        <Modal.Body fullHeight={true}>
          <div className="image--container">
            <img
              src={props.imagePath}
              className="image--large"
              alt={item.title} />
          </div>
        </Modal.Body>
        {/* <PortitudeModal.Footer></PortitudeModal.Footer> */}
      </Modal>
    </div>
  )
}

export default ItemComponent
