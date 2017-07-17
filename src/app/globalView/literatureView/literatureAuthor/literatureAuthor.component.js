import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
import historyService from 'Services/history.service';
import LiteratureDisplay from '../literatureDisplay/literatureDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import './literatureAuthor.component.less';

export default class LiteratureAuthor extends React.Component {
  //document.querySelector('body').scrollTop = 0;
  constructor (props) {
    super(props);
    this.props = props;
    this.author = props.currentAuthor;
    this.authorData = dataService.getAuthorData(this.author.authorKey);
    this.titles = this.getTitles();
    this.loadDefaultProfileImage = this.loadDefaultProfileImage.bind(this);
  }

  getTitles () {
    return this.authorData.content.map((title, index) => {
      title.author = this.author;
      return (
        <li key={title.fileName}>
          <Link
            to={`/literature/${this.author.authorKey}/${title.fileName}`}
            onClick={historyService.addToHistory.bind(this, {type: 'litHistory', data: title})}>
              <span>{decodeURIComponent(title.title)}</span>
            </Link>
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
          <BackToTop />
        </div>
        <Route path='/literature/:author/:work' render={routeProps => (
          <LiteratureDisplay
            currentAuthor={this.author}
            {...routeProps} />
        )} />
      </div>
    );
  }
}
