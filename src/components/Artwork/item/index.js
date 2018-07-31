import artworkService from 'Services/artwork.service'
import Modal from 'common/modal'
import { StyledItemBody, StyledItemImage } from './artworkItem.style'

const ArtworkItem = props => {
  const item = artworkService.getItemWith(props.globalState.routing.collection, props.globalState.routing.item)
  const imagePath = artworkService.getImagePathLg(item.creator.id, item.id)
  const creator = item.creator

  const onClose = () => {
    location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'))
  }

  return (
    <StyledItemBody>
      <Modal
        open={true}
        onClose={onClose}
        size="lg">
        <Modal.Header title={item.name} subtitle={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
        <Modal.Body fullHeight={true}>
          <StyledItemImage
            src={imagePath}
            alt={item.title} />
        </Modal.Body>
        {/* <PortitudeModal.Footer></PortitudeModal.Footer> */}
      </Modal>
    </StyledItemBody>
  )
}

export default ArtworkItem
