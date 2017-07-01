import React from 'react';
import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap'
import historyService from 'Services/history.service';
import './artHistory.component.less';

const ArtHistory = (props) => {
  let historyList = historyService.getArtHistory();
  let historyListMap = historyList.map((historyObj, index) => {
    return (
      <li className="artHistoryObj" key={historyObj.fileName}>
        <Link
          to={`./content/artwork/${historyObj.artist.artistKey}/${historyObj.fileName}.jpg`}
          title={historyObj.title}
          key={historyObj.fileName}>
          <img
            className="artHistoryObjThumb"
            src={`./content/artwork/${historyObj.artist.artistKey}/${historyObj.fileName}_sm.jpg`}
            alt={historyObj.title} />
        </Link>
        <Link to={`/artwork/${historyObj.artist.artistKey}/${historyObj.fileName}`}>{decodeURIComponent(historyObj.title)}</Link>
        <div className="artHistoryObjDesc">By {historyObj.artist.fname} {historyObj.artist.lname}<br />
          {historyObj.timestamp}
        </div>
      </li>
    );
  });
  let dynamicClass = historyListMap.length ? '' : 'hideArtHistory';

  return (
    <ul className={`artHistoryList ${dynamicClass}`}>
      <h3>Recently viewed:</h3>
      {historyListMap}
      <div className="clearHistory">
        <button className="button" onClick={historyService.clearHistory.bind(this, 'artHistory')}>Clear History</button>
      </div>
    </ul>
  );

}

export default ArtHistory;
