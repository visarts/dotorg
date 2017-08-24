import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import ArtCarousel from 'SharedComponents/artCarousel/artCarousel.component';
import './artsDisplay.component.less';

const ArtsDisplay = (props) => {
  const currentImage = props.store.currentWork;
  const getCurrentImage = () => props.store.currentWork;
  const currentArtist = props.store.currentCreator;
  const getPosition = () => {
    let position = 0;
    for (let i in currentArtist.content) {
      if (currentArtist.content[i].fileName === currentImage.fileName) {
        position = i;
        break;
      }
    }
    return parseInt(position);
  }
  const currentPosition = getPosition();
  const nextPosition = currentPosition === currentArtist.content.length - 1 ? currentPosition : currentPosition + 1;
  const prevPosition = currentPosition === 0 ? currentPosition : currentPosition - 1;
  const hideModal = () => {
    location.hash = `#/arts/${currentArtist.creatorKey}`;
  }

  return (
    <div className="artsDisplay">
      <Modal
        show={true}
        onHide={hideModal.bind(this)}
        dialogClassName="custom-modal arts-modal">
        <Modal.Header closeButton>
          <h1>Portitude Gallery | {currentArtist.lname}</h1>
        </Modal.Header>
        <Modal.Body className="darkMode">
          <h1 className="artsTitle">{currentImage.title} &mdash; {currentImage.date}</h1>
          <div className="artsContent">
            {currentPosition > 0 && <Link to={currentArtist.content[prevPosition].fileName} className="thumbArrow thumbArrowLeft"><Glyphicon glyph="menu-left" /></Link>}
            <img src={`./content/artwork/${currentArtist.creatorKey}/${currentImage.fileName}.jpg`} className="artsDisplayImage" />
            {currentPosition < currentArtist.content.length - 1 && <Link to={currentArtist.content[nextPosition].fileName} className="thumbArrow thumbArrowRight"><Glyphicon glyph="menu-right" /></Link>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ArtCarousel
            currentArtist={currentArtist}
            currentImage={getCurrentImage()}
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
