import { useState } from 'react'
import _ from 'lodash'

import dataService from 'Services/data.service'
import literatureService from 'Services/literature.service'
import LiteratureItemComponent from './LiteratureItemComponent'

const originalPath = document.location.pathname

const getInitialPageNumber = () => {
  return originalPath.indexOf('?page=') > -1 ? parseInt(originalPath.slice(originalPath.indexOf('=') + 1)) : 1
}

const LiteratureItem = props => {
  const [content, setContent] = useState(null)
  const [currentPage, setCurrentPage] = useState(getInitialPageNumber())
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const item = literatureService.getItemWith(props.globalState.routing.collection, props.globalState.routing.item)
  const pages = []

  // take the HTML and split it into an array by the items precaculated page sizes
  const setPages = content => {
    let remainingContent = content
    _.map(item.pageSizes, pageSize => {
      pages.push(remainingContent.substring(0, pageSize))
      remainingContent = remainingContent.substring(pageSize)
    })
  }

  const initContent = () => {
    dataService.getHTMLContent(item.creator.id, item.id)
      .then(content => {
        setPages(content)
        setContent({content: pages[state.currentPage - 1]})
      })
  }

  const setPageQuery = currentPage => {
    const currentPath = originalPath.indexOf('?page=') > -1 ? originalPath.slice(0, originalPath.indexOf('?')) : originalPath
    document.location.pathname = `${currentPath}?page=${currentPage}`
  }

  const setFirstPage = () => {
    const currentPage = 0
    setState({content: pages[currentPage], currentPage}, () => setPageQuery(currentPage))
  }

  const setLastPage = () => {
    const currentPage = pages.length - 1
    setState({content: pages[currentPage], currentPage}, () => setPageQuery(currentPage))
  }

  const setNextPage = e => {
    const currentPage = state.currentPage + 1
    setState({content: pages[currentPage - 1], currentPage}, () => setPageQuery(currentPage))
  }

  const setPreviousPage = () => {
    const currentPage = state.currentPage - 1
    setState({content: pages[currentPage - 1], currentPage}, () => setPageQuery(currentPage))
  }

  const hideModal = () => {
    setState({modalIsOpen: false}, () => {
      location.pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/'))
    })
  }

  return (
    <div>
      {state.content &&
        <LiteratureItemComponent
          {...props}
          modalIsOpen={state.modalIsOpen}
          hideModal={hideModal}
          item={item}
          content={state.content}
          setFirstPage={setFirstPage}
          setLastPage={setLastPage}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
          pages={pages}
          currentPage={state.currentPage} />
      }
    </div>
  )
}

export default LiteratureItem
