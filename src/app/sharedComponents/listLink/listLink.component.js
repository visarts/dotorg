import { Link } from 'react-router-dom';
import './listLink.component.less';

const ListLink = (props) => {

  let otherText = '';
  let smallScreen = 768;
  let otherTextLimit = window.innerWidth >= smallScreen ? 130 : 100;

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
      <li className={`listLink listLinkThumbView`}>
        <Link
          to={props.url}
          onClick={props.action}>
          <img
            className="listLinkThumb"
            src={props.thumb}
            alt={props.text} />
          <h3 className="linkListTitle">{props.text}</h3>
          {props.other && <div className="listLinkSubtext">{otherText}</div>}
        </Link>
      </li>
    );
  }
  return (
    <li className={`listLink ${props.inlined ? 'listLinkInlined' : ''}`}>
      <Link
        to={props.url}
        onClick={props.action}>
        <h3 className="linkListTitle">{props.text}</h3>
        {props.other && <div className="listLinkSubtext">{otherText}</div>}
        <div>{props.children}</div>
      </Link>
    </li>
  );
};

export default ListLink;
