// import {createStore} from 'redux'
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
// const store = createStore(reducer)


const artHistory = localStorage.getItem('artHistory') ? JSON.parse(localStorage.getItem('artHistory')): {historyList: []}
const literatureHistory = localStorage.getItem('litHistory') ? JSON.parse(localStorage.getItem('litHistory')) : {historyList: []}
const historyLimit = 10

const getDuplicateIndex = (obj, arr) => {
  let isDuplicate = -1
  for (const i in arr) {
    if (obj.fileName === arr[i].fileName) {
      isDuplicate = i
      break
    }
  }
  return isDuplicate
}

const setTimestamp = () => {
  const date = new Date()
  return date.toLocaleDateString()
}

const addToHistory = (history) => {
  const data = history.data
  const historyList = history.type === 'artHistory' ? artHistory.historyList : literatureHistory.historyList
  const duplicateIndex = getDuplicateIndex(data, historyList)
  data.timestamp = setTimestamp()
  if (duplicateIndex > -1) {
    historyList.splice(duplicateIndex, 1)
  }
  historyList.unshift(data)
  if (historyList.length > historyLimit) {
    historyList.pop()
  }
  localStorage.setItem(history.type, JSON.stringify({historyList}))
}

const getHistory = (type) => {
  return type === 'artHistory' ? artHistory.historyList : literatureHistory.historyList
}

const clearHistory = (type) => {
  localStorage.removeItem(type)
  location.reload()
}

const historyService = {
  addToHistory,
  getHistory,
  clearHistory
}

export default historyService
