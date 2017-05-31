import React from 'react';
import './globalFooter.component.less';

const GlobalFooter = (props) => {
  return (
    <div className="globalFooter">
      <div className="copyright">{decodeURIComponent('%C2%A9')} 2017 Portitude.com</div>
    </div>
  );
}

export default GlobalFooter;
