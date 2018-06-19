import artworkService from 'Services/artwork.service'
import Modal from 'common/modal'
import './artworkItem.style.scss'

const ArtworkItem = props => {
  const item = artworkService.getItemWith(props.globalState.routing.collection, props.globalState.routing.item)
  const imagePath = artworkService.getImagePathLg(item.creator.id, item.id)
  const creator = item.creator

  const onClose = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'))
  }

  return (
    <div className="artwork--item">
      <Modal
        open={true}
        onClose={onClose}
        size="lg">
        <Modal.Header title={item.name} subtitle={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
        <Modal.Body fullHeight={true}>
          <div className="image--container">
            <img
              src={imagePath}
              className="image--large"
              alt={item.title} />
          </div>
        </Modal.Body>
        {/* <PortitudeModal.Footer></PortitudeModal.Footer> */}
      </Modal>
    </div>
  )
}

export default ArtworkItem
