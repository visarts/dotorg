import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import Lightbox from 'react-images';
import eventService from 'Services/event.service';
import ArtCarousel from 'SharedComponents/artCarousel/artCarousel.component';
import './artsDisplay.component.less';

const ArtsDisplay = (props) => {
  const artistKey = props.match.params.artist;
  const artist = props.store.artistsData[artistKey];
  const currentArtworkKey = props.match.params.artwork;
  const currentArtwork = artist.content.filter(artwork => artwork.fileName === currentArtworkKey)[0];
  const getCurrentArtwork = () => artist.content.filter(artwork => artwork.fileName === currentArtworkKey)[0];
  const getPosition = () => {
    let position = 0;
    for (let i in artist.content) {
      if (artist.content[i].fileName === currentArtwork.fileName) {
        position = i;
        break;
      }
    }
    return parseInt(position);
  }
  const currentPosition = getPosition();
  const nextPosition = currentPosition === artist.content.length - 1 ? currentPosition : currentPosition + 1;
  const prevPosition = currentPosition === 0 ? currentPosition : currentPosition - 1;
  const hideModal = () => {
    let params = props.appState.getTrimmedURI(2);
    location.hash = `#/${params}`
    //location.hash = `#/arts/artists/${artistKey}`;
  }

  const leftSwipeHandler = () => {
    let rightArrow = document.querySelector('.thumbArrowRight') ? document.querySelector('.thumbArrowRight') : document.querySelector('.artsDisplayImage');
    rightArrow.click();

  }
  const rightSwipeHandler = () => {
    let leftArrow = document.querySelector('.thumbArrowLeft') ? document.querySelector('.thumbArrowLeft') : document.querySelector('.artsDisplayImage');
    leftArrow.click();

  }

  eventService.setSwipeActions({
    node: '.artsContent',
    leftSwipeHandler,
    rightSwipeHandler,
    isFirst: currentPosition > 0 ? false : true,
    isLast: currentPosition < artist.content.length - 1 ? false : true
  });

  return (
    <div className="artsDisplay">
      <Modal
        show={true}
        onHide={hideModal.bind(this)}
        dialogClassName="custom-modal arts-modal">
        <Modal.Header closeButton>
          <h1>Portitude Gallery | {decodeURIComponent(artist.lname)}</h1>
        </Modal.Header>
        <Modal.Body className="darkMode">
          <h1 className="artsTitle">{decodeURIComponent(currentArtwork.title)} &mdash; {currentArtwork.date}</h1>
          <div className="artsContent">
            {currentPosition > 0 && <Link to={artist.content[prevPosition].fileName} className="thumbArrow thumbArrowLeft"><Glyphicon glyph="menu-left" /></Link>}
            <img src={`./content/artwork/${artistKey}/${currentArtwork.fileName}.jpg`} className="artsDisplayImage" />
            {currentPosition < artist.content.length - 1 && <Link to={artist.content[nextPosition].fileName} className="thumbArrow thumbArrowRight"><Glyphicon glyph="menu-right" /></Link>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ArtCarousel
            artist={artist}
            artistKey={artistKey}
            currentArtwork={getCurrentArtwork()}
            lgThumbPageSize={6}
            smThumbPageSize={4}
            currentPosition={getPosition()}
            match={props.match}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArtsDisplay;
