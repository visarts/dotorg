import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './backToTop.component.less';

const goBackToTop = (event) => {
  document.querySelector('body').scrollTop = 0;
};

let scrollTimer = null;


const BackToTop = (props) => {

  // Listen for scroll events
  window.addEventListener('scroll', ( event ) => {
    document.querySelector('.backToTop').style.visibility = "hidden";
    // Clear our timeout throughout the scroll
    window.clearTimeout( scrollTimer );

    // Set a timeout to run after scrolling ends
    scrollTimer = setTimeout(() => {
      if (document.querySelector('body').scrollTop > 100) {
        document.querySelector('.backToTop').style.visibility = "visible";
      }

    }, 100);

  }, false);

  return (
    <div className="backToTop" onClick={goBackToTop}>
      <Glyphicon glyph="chevron-up" />
    </div>
  );
};

export default BackToTop;
