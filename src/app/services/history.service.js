const artHistory = localStorage.getItem('artHistory') ? JSON.parse(localStorage.getItem('artHistory')) : [];
const literatureHistory = localStorage.getItem('litHistory') ? JSON.parse(localStorage.getItem('litHistory')) : [];
const historyLimit = 10;

const setTimestamp = () => {
  let date = new Date();
  return date.toLocaleDateString();
}

const addArtToHistory = (artObj) => {
  artObj.timestamp = setTimestamp();
  artHistory.push(artObj);
  if (artHistory.length > historyLimit) {
    artHistory.shift();
  }
  localStorage.setItem('artHistory', JSON.stringify(artHistory.reverse()));
};

const addLiteratureToHistory = (litObj) => {
  litObj.timestamp = setTimestamp();
  literatureHistory.push(litObj);
  if (literatureHistory.length > historyLimit) {
    literatureHistory.shift();
  }
  localStorage.setItem('litHistory', JSON.stringify(literatureHistory.reverse()));
};

const getArtHistory = () => {
  return artHistory;
};

const getLiteratureHistory = () => {
  return literatureHistory;
};

const clearHistory = (type) => {
  localStorage.removeItem(type);
  location.reload();
}

const historyService = {
  addArtToHistory,
  addLiteratureToHistory,
  getArtHistory,
  getLiteratureHistory,
  clearHistory
};

export default historyService;
