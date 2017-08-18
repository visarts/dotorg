import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import './artsDisplay.component.less';

export default class ArtsDisplay extends React.Component {

  constructor (props) {
    super(props);
    this.setValues = this.setValues.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getThumbs = this.getThumbs.bind(this);
    this.getThumbPages = this.getThumbPages.bind(this);
    this.getCurrentThumbPage = this.getCurrentThumbPage.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = {
      currentThumbPage: this.getCurrentThumbPage()
    };
    this.setValues();
  }

  setValues (initiated) {
    this.currentImage = this.props.store.currentWork;
    this.currentArtist = this.props.store.currentCreator;
    this.currentPosition = this.getPosition();
    this.nextPosition = this.currentPosition === this.currentArtist.content.length - 1 ? this.currentPosition : this.currentPosition + 1;
    this.prevPosition = this.currentPosition === 0 ? this.currentPosition : this.currentPosition - 1;

    this.thumbs = this.getThumbs();
    this.lgThumbPageSize = 6;
    this.smThumbPageSize = 4;
    this.thumbPages = this.getThumbPages();
    //this.setState(this.state);
    if (!initiated) {
      this.setState({currentThumbPage: this.getCurrentThumbPage()});
    }
  }

  getPosition () {
    let position = 0;
    for (let i in this.currentArtist.content) {
      if (this.currentArtist.content[i].fileName === this.currentImage.fileName) {
        position = i;
        break;
      }
    }
    return parseInt(position);
  }

  getThumbs () {
    return this.currentArtist.content.map((item, index) => {
      //item.artist = this.currentArtist;
      //item.index = index;
      return (
        <li className={item.fileName === this.currentImage.fileName ? 'thumbnail selected' : 'thumbnail'} key={item.fileName}>
          <Link
            to={`${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${this.currentArtist.creatorKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
          </Link>
        </li>
      );
    });
  }

  getThumbPages () {
    let thumbPages = [];
    const lgThumbPageCount = Math.ceil(this.thumbs.length / this.lgThumbPageSize);
    const smThumbPageCount = Math.ceil(this.thumbs.length / this.smThumbPageSize);

    for (let i = 0; i < lgThumbPageCount; i++) {
        let j = parseInt(i) * this.lgThumbPageSize;
        thumbPages.push(this.thumbs.slice(parseInt(j), (parseInt(j) + this.lgThumbPageSize )))
    }
    return thumbPages;
  }

  getCurrentThumbPage () {
    const mathPos = (this.currentPosition + 1) % this.lgThumbPageSize === 0 ? Math.floor : Math.ceil;
    const currentThumbPage = mathPos(((this.currentPosition + 1) / this.lgThumbPageSize)) - 1 || 0;
    return currentThumbPage;
  }

  hideModal () {
    location.hash = `#/arts/${this.currentArtist.creatorKey}`;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.artwork !== nextProps.match.params.artwork) {
      //this.setValues();
      this.setState({currentThumbPage: this.getCurrentThumbPage()}, () => {
        document.querySelector('.modal-body').scrollTop = 0;
        this.setValues(true);
      });
    }
  }

  render () {
    return (
      <div className="artsDisplay">
        <Modal
          show={true}
          onHide={this.hideModal}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <h1>Portitude Gallery</h1>
          </Modal.Header>
          <div className="modal-nav">
            <span className="readingMenu">
              <Link to={this.currentArtist.content[this.prevPosition].fileName}><Glyphicon glyph="chevron-left" /></Link>
              <Link to={this.currentArtist.content[this.nextPosition].fileName}><Glyphicon glyph="chevron-right" /></Link>
            </span>
            <span className="readingControls">
              &nbsp;
            </span>
          </div>
          <Modal.Body className="darkMode">
            <h1 className="artsTitle">{this.currentImage.title}</h1>
            <div className="artsContent">
              <img src={`./content/artwork/${this.currentArtist.creatorKey}/${this.currentImage.fileName}.jpg`} className="artsDisplayImage" />
            </div>
            <div className="artsThumbs">
              <div className="imageGrid">
                {this.thumbPages[this.state.currentThumbPage].map(item => item)}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
