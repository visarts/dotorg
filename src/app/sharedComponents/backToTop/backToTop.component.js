import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './backToTop.component.less';

export default class BackToTop extends React.Component  {

  constructor (props) {
    super(props);
    this.scrollTimer = null;
    this.goBackToTop = this.goBackToTop.bind(this);
  }

  componentDidMount () {
    // Listen for scroll events
    window.addEventListener('scroll', this.setScroll, false);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.setScroll);
  }

  setScroll (event) {
    document.querySelector('.backToTop').style.visibility = "hidden";
    // Clear our timeout throughout the scroll
    window.clearTimeout( this.scrollTimer );

    // Set a timeout to run after scrolling ends
    this.scrollTimer = setTimeout(() => {
      if (document.querySelector('html').scrollTop > 100 && document.querySelector('.backToTop')) {console.log('something');
        document.querySelector('.backToTop').style.visibility = "visible";
      }

    }, 100);
  }

  goBackToTop (event) {
    document.querySelector('html').scrollTop = 0;
    /*var timerID = setInterval(function() {
    if( window.pageYOffset <= 500 )
        window.scrollBy(0, 5);

    else
        clearInterval(timerID);
    }, 1);*/
  }

  render () {
    return (
      <div className="backToTop" onClick={this.goBackToTop}>
        <Glyphicon glyph="chevron-up" />
      </div>
    );
  }
};
