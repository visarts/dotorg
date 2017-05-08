import React from 'react';
import './authorLitHome.component.less';

const AuthorLitHome = (props) => {
  const content = require(`../../../content/${props.currentMatch.params.work}.html`);
  const htmlContent = {__html: content};
  return (
    <div className="authorLitHome">
      <div className="section" dangerouslySetInnerHTML={htmlContent}>
      </div>
    </div>
  );
}

export default AuthorLitHome;
