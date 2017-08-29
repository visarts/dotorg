import React from 'react';
import { Link } from 'react-router-dom';
import './listLink.component.less';

const ListLink = (props) => {
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
    <li className="listLink">
      <Link
        to={props.url}
        onClick={props.action}>
          <span>{decodeURIComponent(props.text)}</span>
        </Link>
    </li>
  );
};

export default ListLink;
