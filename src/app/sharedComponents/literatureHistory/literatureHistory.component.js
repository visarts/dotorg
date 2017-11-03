import React from 'react';
import { Link } from 'react-router-dom';
import historyService from 'Services/history.service';
import PrimaryButton from 'SharedComponents/buttons/primary/primaryButton.component';
import './literatureHistory.component.less';

const LiteratureHistory = (props) => {
  let historyList = historyService.getHistory('litHistory');
  let historyListMap = historyList.map((historyObj, index) => {
    return (
      <li className="litHistoryObj" key={historyObj.fileName}>
        <Link to={`/literature/a/${historyObj.fileName.slice(0, historyObj.fileName.indexOf('-'))}/${historyObj.genre}/${historyObj.fileName}`}>{historyObj.title}</Link>
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
        <PrimaryButton text="Clear History" action={historyService.clearHistory.bind(this, 'litHistory')} />
      </div>
    </ul>
  );

}

export default LiteratureHistory;
