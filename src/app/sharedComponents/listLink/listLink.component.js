import React from 'react';
import { Link } from 'react-router-dom';
import './listLink.component.less';

const ListLink = (props) => {

  let otherText = '';
  let smallScreen = 768;
  let otherTextLimit = window.innerWidth >= smallScreen ? 200 : 80;

  if (props.other) {
    if (props.other.length > otherTextLimit) {
      otherText = props.other.substring(0, otherTextLimit);
      otherText = otherText.substring(0, otherText.lastIndexOf(' ')).concat('...');
    } else {
      otherText = props.other;
    }
  }

  if (props.thumb) {
    return (
      <li className="listLink listLinkThumbView">
        <Link
          to={props.url}
          onClick={props.action}>
            <img
              className="listLinkThumb"
              src={props.thumb}
              alt={props.text} />
            <div>{decodeURIComponent(props.text)}</div>
            <div className="listLinkSubtext">{props.subtext}</div>
          </Link>
      </li>
    );
  }
  return (
    <li className={`listLink ${props.inlined ? 'listLinkInlined' : ''}`}>
      <Link
        to={props.url}
        onClick={props.action}>
          <span>{decodeURIComponent(props.text)}</span>
          {props.other && <div className="listLinkSubtext">{otherText}</div>}
          <div>{props.children}</div>
        </Link>
    </li>
  );
};

export default ListLink;
