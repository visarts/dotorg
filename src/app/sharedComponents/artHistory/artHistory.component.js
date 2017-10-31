import React from 'react';
import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap'
import historyService from 'Services/history.service';
import './artHistory.component.less';

const ArtHistory = (props) => {
  let historyList = historyService.getHistory('artHistory');
  let historyListMap = historyList.map((historyObj, index) => {
    const artistKey = historyObj.fileName.slice(0, historyObj.fileName.indexOf('-'));
    return (
      <li className="artHistoryObj" key={historyObj.fileName}>
        <Link
          to={`./content/artwork/${artistKey}/${historyObj.fileName}.jpg`}
          title={historyObj.title}
          key={historyObj.fileName}>
          <img
            className="artHistoryObjThumb"
            src={`./content/artwork/${artistKey}/${historyObj.fileName}_sm.jpg`}
            alt={historyObj.title} />
        </Link>
        <Link to={`/arts/a/${artistKey}/${historyObj.artist.era}/${historyObj.fileName}`}>{historyObj.title}</Link>
        <div className="artHistoryObjDesc">By {`${historyObj.artist.fname} ${historyObj.artist.lname}`}<br />
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
