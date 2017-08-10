import React from 'react';
import { Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap'
import historyService from 'Services/history.service';
import './literatureHistory.component.less';

const LiteratureHistory = (props) => {
  let historyList = historyService.getHistory('litHistory');
  let historyListMap = historyList.map((historyObj, index) => {
    return (
      <li className="litHistoryObj" key={historyObj.fileName}>
        <Link to={`/literature/${historyObj.author.creatorKey}/${historyObj.fileName}`}>{decodeURIComponent(historyObj.title)}</Link>
        <div className="litHistoryObjDesc">By {historyObj.author.fname} {historyObj.author.lname}<br />
          {historyObj.timestamp}
        </div>
      </li>
    );
  });
  let dynamicClass = historyListMap.length ? '' : 'hideLitHistory';

  return (
    <ul className={`litHistoryList ${dynamicClass}`}>
      <h3>Recently read:</h3>
      {historyListMap}
      <div className="clearHistory">
        <button className="button" onClick={historyService.clearHistory.bind(this, 'litHistory')}>Clear History</button>
      </div>
    </ul>
  );

}

export default LiteratureHistory;
