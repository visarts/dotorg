import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
import historyService from 'Services/history.service';
import LiteratureDisplay from '../literatureDisplay/literatureDisplay.component';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureAuthor.component.less';

export default class LiteratureAuthor extends React.Component {
  //document.querySelector('body').scrollTop = 0;
  constructor (props) {
    super(props);
    this.props = props;
    this.author = this.props.updateCurrentAuthor(this.props.match.params.author);
    //this.author = this.props.store.currentCreator;
    this.authorData = dataService.getAuthorData(this.author.creatorKey);
    this.titles = this.getTitles();
    //this.openTitle = this.openTitle.bind(this);
    this.loadDefaultProfileImage = this.loadDefaultProfileImage.bind(this);
  }

  getTitles () {
    return this.authorData.content.map((title, index) => {
      title.author = this.author;
      return (
        <ListLink
          key={title.fileName}
          url={`/literature/${this.author.creatorKey}/${title.fileName}`}
          action={this.openTitle.bind(this, title)}
          text={title.title} />
      );
    });
  }

  openTitle (title) {
    historyService.addToHistory({type: 'litHistory', data: title})
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
            <img src={`./content/portraits/authors/${this.author.creatorKey}.jpg`} onError={this.loadDefaultProfileImage} />
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
