import React from 'react';
import { Route, Link } from 'react-router-dom';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import historyService from 'Services/history.service';
import ArtsDisplay from '../artsDisplay/artsDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './artsArtist.component.less';


export default class ArtsArtist extends React.Component {

  constructor (props) {
    super(props);
    document.querySelector('body').scrollTop = 0;
    this.artist = this.props.currentArtist;
    this.artistData = dataService.getArtistData(this.artist.artistKey);
    this.imageList = this.getImages();
    this.thumbs = this.getThumbs();
    this.state = {
      currentImage: null
    };
  }

  getImages () {
    const imageList = [];
    this.artistData.content.map((item, index) => {
      imageList.push({
        src: `./content/artwork/${this.artist.artistKey}/${item.fileName}.jpg`,
        thumbnail: `./content/artwork/${this.artist.artistKey}/${item.fileName}_sm.jpg`,
        caption: item.title,
        itemKey: item.fileName
      });
      return;
    });

    return imageList;
  }

  getThumbs () {
    return this.artistData.content.map((item, index) => {
      item.artist = this.artist;
      //item.index = index;
      return (
        <li className="thumbnail" key={item.fileName}>
          <Link
            to={`${this.artist.artistKey}/${item.fileName}`}
            title={item.title}
            key={item.fileName}
            onClick={this.openImage.bind(this, item)}>
            <img
              src={`./content/artwork/${this.artist.artistKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
            <span>{item.title}</span>
          </Link>
        </li>
      );
    });
  }

  openImage (item) {
    historyService.addToHistory({type: 'artHistory', data: item});
    this.setState({currentImage: item});
    this.props.storeService.updateStore({currentWork: item});
  }

  render () {
    return (
      <div className="artsArtist">
        <h1>{decodeURIComponent(`${this.artist.fname} ${this.artist.lname}`)}</h1>
        <div className="artistBio">{ this.artist.bio }</div>
        <ul className="imageGrid">{ this.thumbs }</ul>
        <BackToTop />
        <Route path='/arts/:artist/:artwork' render={routeProps => (
          <ArtsDisplay
            currentArtist={this.artist}
            currentImage={this.state.currentImage}
            imageList={this.imageList}
            updateCurrent={this.props.updateCurrent}
            appState={this.props.appState}
            storeService={this.props.storeService}
            {...routeProps} />
        )} />
      </div>
    );
  }
}
