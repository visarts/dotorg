import React from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'react-images';

export default class ArtsDisplay extends React.Component {

  constructor (props) {
    super(props);

    this.imageList = this.getImages();

    this.state = {
			lightboxIsOpen: true,
			currentImage: 0,
		};

    this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox (index, item, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
    item.artist = this.artist;
    historyService.addToHistory({type: 'artHistory', data: item});
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage (index) {
    this.setState({
      currentImage: index,
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
        isOpen={this.state.lightboxIsOpen}
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
