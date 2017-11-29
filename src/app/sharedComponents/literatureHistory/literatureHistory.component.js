import { Link } from 'react-router-dom';
import historyService from 'Services/history.service';
import PrimaryButton from 'SharedComponents/buttons/primary/primaryButton.component';
import './literatureHistory.component.scss';

const LiteratureHistory = (props) => {

  let historyList = historyService.getHistory('litHistory');
  let historyListMap = historyList.map((historyObj, index) => {
    return (
      <div className="item tns-item" key={historyObj.fileName}>
        <Link to={`/literature/a/${historyObj.fileName.slice(0, historyObj.fileName.indexOf('-'))}/${historyObj.genre}/${historyObj.fileName}`}>{historyObj.title}</Link>
        <div className="itemDescription">By {historyObj.author.fname} {historyObj.author.lname}<br />
          {historyObj.timestamp}
        </div>
      </div>
    );
  });
  let dynamicClass = historyListMap.length ? '' : 'hideLitHistory';

  return (
    <div className={`litHistoryList ${dynamicClass}`}>
      <div className="slider">
        {historyListMap}
      </div>
      <div className="clearHistory">
        <PrimaryButton text="Clear History" action={historyService.clearHistory.bind(this, 'litHistory')} />
      </div>
    </div>
  );

}

export default LiteratureHistory;
