import React from 'react';
import { Link } from 'react-router-dom';
import './listLink.component.less';

const ListLink = (props) => {
  return (
    <li>
      <Link
        to={props.url}
        onClick={props.action}>
          <span>{decodeURIComponent(props.text)}</span>
        </Link>
    </li>
  );
};

export default ListLink;
