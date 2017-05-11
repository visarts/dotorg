import React from 'react';
import './authorLitHome.component.less';

const AuthorLitHome = (props) => {
  const currentWorkKey = props.currentMatch.params.work;
  const content = require(`Literature/${props.data.authorKey}/${currentWorkKey}.html`);
  const currentWork = props.data.content.filter(item => item.fileName === currentWorkKey)[0];
  const htmlContent = {__html: content};

  return (
    <div className="authorLitHome">
      <div className="section">
        <h1>{currentWork.title}</h1>
        <h2>{props.data.fname} {props.data.lname}</h2>
        <div className="content" dangerouslySetInnerHTML={htmlContent}></div>
      </div>
    </div>
  );
}

export default AuthorLitHome;
