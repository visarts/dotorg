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
    this.state = {
      isScrolling: false
    };
    this.props = props;
    this.author = props.currentAuthor;
    this.authorData = dataService.getAuthorData(this.author.authorKey);
    this.titles = this.authorData.content.map((title, index) => {
      return (
        <li key={index}>
          {this.props.location.pathname !== `/literature/${this.author.authorKey}/${title.fileName}` ?
            <Link to={`/literature/${this.author.authorKey}/${title.fileName}`}>{decodeURIComponent(title.title)}</Link> :
            <a href="#" className="selected">{title.title}</a>
          }
        </li>
      );
    });
    this.scrollTimer = null;
    this.goBackToTop = this.goBackToTop.bind(this);
  }

  goBackToTop (event) {
    document.querySelector('body').scrollTop = 0;
  }

  componentDidMount () {

    let that = this;
    // Listen for scroll events
    window.addEventListener('scroll', function ( event ) {
      that.setState({isScrolling: true}, () =>{
        document.querySelector('.backToTop').style.visibility = "hidden";
      });
        // Clear our timeout throughout the scroll
        window.clearTimeout( this.scrollTimer );

        // Set a timeout to run after scrolling ends
        this.scrollTimer = setTimeout(() => {
          that.setState({isScrolling: false}, () =>{
            if (document.querySelector('body').scrollTop > 100) {
              document.querySelector('.backToTop').style.visibility = "visible";
            }
          });

        }, 100);

    }, false);

  }

  render () {
    return (
      <div className="literatureAuthor">
        <h1>{`${this.author.fname} ${this.author.lname}`}</h1>
        <div className="authorPic">
          <img src="./images/andersenhc.jpg" />
        </div>
        <div className="bio">{this.author.bio}</div>
        <ul className="titles">{ this.titles }</ul>
        <div className="titlesFadeOut"></div>
        <div className="backToTop" onClick={this.goBackToTop}>
          <Glyphicon glyph="chevron-up" />
        </div>
      </div>
    );
  }
}
