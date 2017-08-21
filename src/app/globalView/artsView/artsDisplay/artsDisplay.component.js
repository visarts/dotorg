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
  const getThumbs = () => {
    return currentArtist.content.map((item, index) => {
      //item.artist = currentArtist;
      //item.index = index;
      return (
        <li className={item.fileName === currentImage.fileName ? 'thumbnail selected' : 'thumbnail'} key={item.fileName}>
          <Link
            to={`${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${currentArtist.creatorKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
          </Link>
        </li>
      );
    });
  };

  const hideModal = () => {
    location.hash = `#/arts/${currentArtist.creatorKey}`;
  }

  return (
    <div className="artsDisplay">
      <Modal
        show={true}
        onHide={hideModal.bind(this)}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <h1>Portitude Gallery</h1>
        </Modal.Header>
        <div className="modal-nav">
          <span className="readingMenu">
            <Link to={currentArtist.content[prevPosition].fileName}><Glyphicon glyph="chevron-left" /></Link>
            <Link to={currentArtist.content[nextPosition].fileName}><Glyphicon glyph="chevron-right" /></Link>
          </span>
          <span className="readingControls">
            &nbsp;
          </span>
        </div>
        <Modal.Body className="darkMode">
          <h1 className="artsTitle">{currentImage.title}</h1>
          <div className="artsContent">
            <img src={`./content/artwork/${currentArtist.creatorKey}/${currentImage.fileName}.jpg`} className="artsDisplayImage" />
          </div>
          <ArtCarousel
            currentArtist={currentArtist}
            currentImage={getCurrentImage()}
            lgThumbPageSize={6}
            smThumbPageSize={4}
            currentPosition={getPosition()}
            match={props.match}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ArtsDisplay;
