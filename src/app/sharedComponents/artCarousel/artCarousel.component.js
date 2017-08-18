import React from 'react';
import { Link } from 'react-router-dom';
import './artCarousel.component.less';


export default class ArtCarousel extends React.Component {

  constructor (props) {
    super(props);

    this.getThumbs = this.getThumbs.bind(this);
    this.getThumbPages = this.getThumbPages.bind(this);
    this.getCurrentThumbPage = this.getCurrentThumbPage.bind(this);
    this.getThumbs = this.getThumbs.bind(this);
    this.thumbPages = this.getThumbPages();

    this.state = {
      currentThumbPage: this.getCurrentThumbPage()
    };
  }

  getThumbs () {
    return this.props.currentArtist.content.map((item, index) => {
      return (
        <li className={item.fileName === this.props.currentImage.fileName ? 'thumbnail selected' : 'thumbnail'} key={item.fileName}>
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

  getCurrentThumbPage () {
    const mathPos = (this.props.currentPosition + 1) % this.props.lgThumbPageSize === 0 ? Math.floor : Math.ceil;
    const currentThumbPage = mathPos(((this.props.currentPosition + 1) / this.props.lgThumbPageSize)) - 1 || 0;
    return currentThumbPage;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.work !== this.props.currentImage.fileName) {
      this.setState({currentThumbPage: this.getCurrentThumbPage()});
    }
  }

  render () {
    return (
      <div className="artCarousel">
        <div className="imageGrid">
          {this.thumbPages[this.state.currentThumbPage].map(item => item)}
        </div>
      </div>
    );
  }
}
