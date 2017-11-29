import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './artCarousel.component.scss';

export default class ArtCarousel extends React.Component {

  constructor (props) {
    super(props);
    this.thumbPageSize = window.innerWidth < 768 ? this.props.smThumbPageSize : this.props.lgThumbPageSize;

    this.getCurrentThumbPage = this.getCurrentThumbPage.bind(this);
    this.state = {
      currentThumbPage: this.getCurrentThumbPage(this.props.currentPosition),
      currentArtwork: this.props.currentArtwork
    };
    this.getThumbPages = this.getThumbPages.bind(this);
    this.thumbPages = this.getThumbPages();
    this.getThumbs = this.getThumbs.bind(this);

    this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
    this.onRightArrowClick = this.onRightArrowClick.bind(this);
  }

  getThumbs () {
    return this.props.artist.content.map((item, index) => {
      return (
        <li className="carouselThumb"
          id={item.fileName}
          key={item.fileName}
          aria-label={item.title}>
          <Link
            to={`${item.fileName}`}
            title={item.title}
            key={item.fileName}>
            <img
              src={`./content/artwork/${this.props.artistKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
          </Link>
        </li>
      );
    });
  }

  getThumbPages () {
    const thumbs = this.getThumbs();
    const thumbPages = [];
    const thumbPageCount = Math.ceil(thumbs.length / this.thumbPageSize);

    for (let i = 0; i < thumbPageCount; i++) {
      if (parseInt(i) !== (thumbPageCount - 1)) {
        const j = parseInt(i) * this.thumbPageSize;
        thumbPages.push(thumbs.slice(parseInt(j), (parseInt(j) + this.thumbPageSize )));
      } else {
        thumbPages.push(thumbs.slice(-(this.thumbPageSize)));
      }

    }
    return thumbPages;
  }

  getCurrentThumbPage (currentPos) {
    const mathPos = (currentPos + 1) % this.thumbPageSize === 0 ? Math.floor : Math.ceil;
    const currentThumbPage = mathPos(((currentPos + 1) / this.thumbPageSize)) - 1 || 0;
    return currentThumbPage;
  }

  onLeftArrowClick () {
    this.setState({currentThumbPage: this.state.currentThumbPage - 1});
  }

  onRightArrowClick () {
    this.setState({currentThumbPage: this.state.currentThumbPage + 1});
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.work !== this.props.currentArtwork.fileName) {
      if (document.querySelector(`#${this.props.currentArtwork.fileName}`)) {
        document.querySelector(`#${this.props.currentArtwork.fileName}`).classList.remove('selectedThumb');

      }
      this.setState({currentThumbPage: this.getCurrentThumbPage(nextProps.currentPosition), currentArtwork: nextProps.currentArtwork}, () => {
        document.querySelector(`#${nextProps.currentArtwork.fileName}`).classList.add('selectedThumb');
      });
    }
  }

  render () {
    return (
      <div className="artCarousel">
        {this.state.currentThumbPage !== 0 &&
        <a className="thumbArrow thumbArrowLeft" onClick={this.onLeftArrowClick}>
          <Glyphicon glyph="menu-left" />
        </a>}
        <ul className="imageGrid">
          {this.thumbPages[this.state.currentThumbPage].map(item => item)}
        </ul>
        {this.state.currentThumbPage !== this.thumbPages.length - 1 &&
        <a className="thumbArrow thumbArrowRight" onClick={this.onRightArrowClick}>
          <Glyphicon glyph="menu-right" />
        </a>}
      </div>
    );
  }
}
