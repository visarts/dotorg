const artHistory = localStorage.getItem('artHistory') ? JSON.parse(localStorage.getItem('artHistory')) : [];
const literatureHistory = localStorage.getItem('litHistory') ? JSON.parse(localStorage.getItem('litHistory')) : [];
const historyLimit = 5;

const setHistoryDate = () => {
  let date = new Date();
  return date.toLocaleDateString();
}

const addArtToHistory = (artObj) => {
  artObj.timestamp = setHistoryDate();
  artHistory.push(artObj);
  if (artHistory.length > historyLimit) {
    artHistory.shift();
  }
  localStorage.setItem('artHistory', JSON.stringify(artHistory));
};

const addLiteratureToHistory = (litObj) => {
  litObj.timestamp = setHistoryDate();
  literatureHistory.push(litObj);
  if (literatureHistory.length > historyLimit) {
    literatureHistory.shift();
  }
  localStorage.setItem('litHistory', JSON.stringify(literatureHistory));
};

const getArtHistory = () => {
  return artHistory;
};

const getLiteratureHistory = () => {
  return literatureHistory;
};

const historyService = {
  addArtToHistory,
  addLiteratureToHistory,
  getArtHistory,
  getLiteratureHistory
};

export default historyService;
