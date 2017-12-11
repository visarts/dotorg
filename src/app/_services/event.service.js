// TBD

const setSwipeActions = (eventObj) => {

  let isScrolling = false;

  let xDown = null;
  let yDown = null;
  const rightSwipeHandler = eventObj.rightSwipeHandler;
  const leftSwipeHandler = eventObj.leftSwipeHandler;
  const node = eventObj.node;
  const handleTouchStart = (evt) => {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };

  const handleTouchMove = (evt) => {
    if ( ! xDown || ! yDown ) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0) {
        /* left swipe */
        if (!isScrolling || eventObj.isLast || eventObj.isFirst) {
          leftSwipeHandler();
        }
        isScrolling = true;
      } else {
        if (!isScrolling || eventObj.isFirst || eventObj.isLast) {
          rightSwipeHandler();
        }
        /* right swipe */
        isScrolling = true;

      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
  setTimeout(() => {
    document.querySelector(node).addEventListener('touchstart', handleTouchStart, false);
    document.querySelector(node).addEventListener('touchmove', handleTouchMove, false);
  }, 100);
};

export default {setSwipeActions};
