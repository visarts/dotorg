import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
import LiteratureDisplay from '../literatureDisplay/literatureDisplay.component';
import './literatureAuthor.component.less';


export default class LiteratureAuthor extends React.Component {
  //document.querySelector('body').scrollTop = 0;
  constructor (props) {
    super(props);
    this.props = props;
    this.author = props.currentAuthor;
    this.authorData = dataService.getAuthorData(this.author.authorKey);
    this.titles = this.getTitles();
    this.scrollTimer = null;
    this.goBackToTop = this.goBackToTop.bind(this);
    this.loadDefaultProfileImage = this.loadDefaultProfileImage.bind(this);
  }

  goBackToTop (event) {
    document.querySelector('body').scrollTop = 0;
  }

  componentDidMount () {

    let that = this;
    // Listen for scroll events
    window.addEventListener('scroll', ( event ) => {
      document.querySelector('.backToTop').style.visibility = "hidden";
      // Clear our timeout throughout the scroll
      window.clearTimeout( this.scrollTimer );

      // Set a timeout to run after scrolling ends
      this.scrollTimer = setTimeout(() => {
        if (document.querySelector('body').scrollTop > 100) {
          document.querySelector('.backToTop').style.visibility = "visible";
        }

      }, 100);

    }, false);

  }

  getTitles () {
    return this.authorData.content.map((title, index) => {
      return (
        <li key={index}>
          <Link to={`/literature/${this.author.authorKey}/${title.fileName}`}>{decodeURIComponent(title.title)}</Link>
        </li>
      );
    });
  }

  loadDefaultProfileImage (event) {
    event.target.src='./content/portraits/profile.jpg';
  }

  render () {
    return (
      <div className="literatureAuthor">
        <h1>{`${this.author.fname} ${this.author.lname}`}</h1>
        <div className="about">
          <div className="authorPic">
            <img src={`./content/portraits/authors/${this.author.authorKey}.jpg`} onError={this.loadDefaultProfileImage} />
          </div>
          <div className="bio">{this.author.bio}<div className="readMoreLink"><a href="#" target="_blank">Read More <Glyphicon glyph="new-window" /></a></div></div>
        </div>
        <div className="titlesContainer">
          <div className="titlesTitle"><h3>Explore the library</h3></div>
          <ul className="titles">{ this.titles }</ul>
          <div className="titlesFadeOut"></div>
            <div className="backToTop" onClick={this.goBackToTop}>
              <Glyphicon glyph="chevron-up" />
            </div>
        </div>
      </div>
    );
  }
}
