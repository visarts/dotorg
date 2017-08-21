import React from 'react';
import { Link } from 'react-router-dom';
import './artCarousel.component.less';


export default class ArtCarousel extends React.Component {

  constructor (props) {
    super(props);
    this.getCurrentThumbPage = this.getCurrentThumbPage.bind(this);
    this.state = {
      currentThumbPage: this.getCurrentThumbPage(),
      currentImage: this.props.currentImage
    };
    this.getThumbPages = this.getThumbPages.bind(this);
    this.thumbPages = this.getThumbPages();
    //this.onThumbClick = this.onThumbClick.bind(this);
    this.getThumbs = this.getThumbs.bind(this);

  }

  getThumbs () {
    return this.props.currentArtist.content.map((item, index) => {
      return (
        <li className="carouselThumb" id={item.fileName} key={item.fileName}>
          <Link
            to={`${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${this.props.currentArtist.creatorKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
          </Link>
        </li>
      );
    });
  }

  getThumbPages () {
    let thumbs = this.getThumbs();
    let thumbPages = [];
    const lgThumbPageCount = Math.ceil(thumbs.length / this.props.lgThumbPageSize);
    const smThumbPageCount = Math.ceil(thumbs.length / this.props.smThumbPageSize);

    for (let i = 0; i < lgThumbPageCount; i++) {
        let j = parseInt(i) * this.props.lgThumbPageSize;
        thumbPages.push(thumbs.slice(parseInt(j), (parseInt(j) + this.props.lgThumbPageSize )))
    }
    return thumbPages;
  }

  getCurrentThumbPage (curPos) {
    const currentPos = curPos ? curPos : this.props.currentPosition;
    const mathPos = (currentPos + 1) % this.props.lgThumbPageSize === 0 ? Math.floor : Math.ceil;
    const currentThumbPage = mathPos(((currentPos + 1) / this.props.lgThumbPageSize)) - 1 || 0;
    return currentThumbPage;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.work !== this.props.currentImage.fileName) {
      document.querySelector(`#${this.props.currentImage.fileName}`).classList.remove('selectedThumb');
      this.setState({currentThumbPage: this.getCurrentThumbPage(nextProps.currentPosition), currentImage: nextProps.currentImage}, () => {
        document.querySelector(`#${nextProps.currentImage.fileName}`).classList.add('selectedThumb');
      });
    }
  }

  render () {
    return (
      <div className="artCarousel">
        <ul className="imageGrid">
          {this.thumbPages[this.state.currentThumbPage].map(item => item)}
        </ul>
      </div>
    );
  }
}
