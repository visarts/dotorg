// import {createStore} from 'redux';
//
// function reducer (state, action) {
//   switch (action.type) {
//     case 'thing1':
//       return Object.assign({}, state, {
//         stuff: action.payload
//       })
//     case 'thing2':
//       return Object.assign({}, state, {
//         otherstuff: action.payload
//       })
//     default:
//       return state
//   }
// }
//
// const store = createStore(reducer);


const artHistory = localStorage.getItem('artHistory') ? JSON.parse(localStorage.getItem('artHistory')) : [];
const literatureHistory = localStorage.getItem('litHistory') ? JSON.parse(localStorage.getItem('litHistory')) : [];
const historyLimit = 10;

const setTimestamp = () => {
  let date = new Date();
  return date.toLocaleDateString();
};

const addToHistory = (history) => {
  let data = history.data;
  let historyList = history.type === 'artHistory' ? artHistory : literatureHistory;
  let historyType = history.type;
  let duplicateIndex = getDuplicateIndex(data, historyList);
  data.timestamp = setTimestamp();
  if (duplicateIndex > -1) {
    historyList.splice(duplicateIndex, 1);
  }
  historyList.unshift(data);
  if (historyList.length > historyLimit) {
    historyList.pop();
  }
  localStorage.setItem(historyType, JSON.stringify(historyList));
};

const getHistory = (type) => {
  return type === 'artHistory' ? artHistory : literatureHistory;
}

const clearHistory = (type) => {
  localStorage.removeItem(type);
  location.reload();
};

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
  addToHistory,
  getHistory,
  clearHistory
};

export default historyService;
