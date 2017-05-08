import React from 'react';
import content from '../../../content/testcontent.html';
import './authorLitHome.component.less';

const AuthorLitHome = (props) => {

  const htmlContent = {__html: content};
  return (
    <div className="authorLitHome">
      <div className="section" dangerouslySetInnerHTML={htmlContent}>
      </div>
    </div>
  );
}

export default AuthorLitHome;
