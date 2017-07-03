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
  let duplicateIndex = getDuplicateIndex(litObj, literatureHistory);
  if (duplicateIndex > -1) {
    literatureHistory.splice(duplicateIndex, 1);
  }
  literatureHistory.unshift(litObj);
  if (literatureHistory.length > historyLimit) {
    literatureHistory.pop();
  }
  localStorage.setItem('litHistory', JSON.stringify(literatureHistory));
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

const getDuplicateIndex = (obj, arr) => {
  let isDuplicate = -1;
  for (let i in arr) {
    if (obj.fileName === arr[i].fileName) {
      isDuplicate = i;
      break;
    }
  }
  return isDuplicate;
};

const historyService = {
  addArtToHistory,
  addLiteratureToHistory,
  getArtHistory,
  getLiteratureHistory,
  clearHistory
};

export default historyService;
