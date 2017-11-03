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
      <li className="historyItem" key={historyObj.fileName}>
        <Link
          to={`/arts/a/${artistKey}/${historyObj.artist.era}/${historyObj.fileName}`}
          title={historyObj.title}
          key={historyObj.fileName}>
          <div className="historyItemThumb">
            <img
              src={`./content/artwork/${artistKey}/${historyObj.fileName}_sm.jpg`}
              alt={historyObj.title} />
          </div>
          <div className="historyItemTitle">{historyObj.title}</div>
          <div className="historyItemDesc">
            By {`${historyObj.artist.fname} ${historyObj.artist.lname}`}<br />
            {historyObj.timestamp}
          </div>
        </Link>
      </li>
    );
  });
  let dynamicClass = historyListMap.length ? '' : 'hideArtHistory';

  return (
    <div className={`historyCarousel ${dynamicClass}`}>
      <h3>Recently viewed:</h3>
      <ul className="historyList">{historyListMap}</ul>
      <div className="clearHistory">
        <PrimaryButton action={historyService.clearHistory.bind(this, 'artHistory')} text="Clear History" />
      </div>
    </div>
  );

}

export default ArtHistory;
