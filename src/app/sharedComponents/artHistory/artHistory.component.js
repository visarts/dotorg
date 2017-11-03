import React from 'react';
import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap'
import historyService from 'Services/history.service';
import PrimaryButton from 'SharedComponents/buttons/primary/primaryButton.component';
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
    <div className={`artHistoryList ${dynamicClass}`}>
      <h3>Recently viewed:</h3>
      <ul>{historyListMap}</ul>
      <div className="clearHistory">
        <PrimaryButton action={historyService.clearHistory.bind(this, 'artHistory')} text="Clear History" />
      </div>
    </div>
  );

}

export default ArtHistory;
