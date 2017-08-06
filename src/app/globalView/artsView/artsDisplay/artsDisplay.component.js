import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import './artsDisplay.component.less';

const ArtsDisplay = (props) => {

  const store = props.storeService.getStore();
  const currentImage = store.currentWork;
  const currentArtist = store.currentCreator;

  const hideModal = () => {
    location.hash = `#/arts/${currentArtist.artistKey}`;
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
            &nbsp;
          </span>
          <span className="readingControls">
            &nbsp;
          </span>
        </div>
        <Modal.Body className="darkMode">
          <h1 className="artsTitle">{currentImage.title}</h1>
          <div className="artsContent">
            <img src={`./content/artwork/${currentArtist.artistKey}/${currentImage.fileName}.jpg`} className="artsDisplayImage" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ArtsDisplay;
