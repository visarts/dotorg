import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';


export default class ArtsDisplay extends React.Component {

  constructor (props) {
    super(props);
    this.artist = this.props.currentArtist;
    this.artistData = dataService.getArtistData(this.artist.artistKey);
    this.imageList = this.props.imageList;
    this.state = {
			currentImage: this.getCurrentImage()
		};

    this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
  }

  getCurrentImage () {
    let currentImage = {};
    const currentImageKey = this.props.match.params.artwork;
    for (let i in this.imageList) {
      if (this.imageList[i].itemKey === currentImageKey) {
        currentImage = parseInt(i);
        break;
      }
    }
    return currentImage;
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    }, () => {
      location.hash = `#/arts/${this.artist.artistKey}`;
    });
  }

  gotoPrevious (e) {
    this.setState({
      currentImage: this.state.currentImage - 1
    }, () => {
      location.hash = `#/arts/${this.artist.artistKey}/${this.imageList[this.state.currentImage].itemKey}`;
    });
  }

  gotoNext (e) {
    this.setState({
      currentImage: this.state.currentImage + 1
    }, () => {
      location.hash = `#/arts/${this.artist.artistKey}/${this.imageList[this.state.currentImage].itemKey}`;
    });
  }

  gotoImage (index) {
    this.setState({
      currentImage: index
    }, () => {
      location.hash = `#/arts/${this.artist.artistKey}/${this.imageList[this.state.currentImage].itemKey}`;
    });
  }

  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return;
    this.gotoNext();
  }


  render () {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.imageList}
        isOpen={true}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
        onClickThumbnail={this.gotoImage}
        showThumbnails={true}
        preloadNextImage={true}
        backdropClosesModal={true}
      />
    );
  }
}
