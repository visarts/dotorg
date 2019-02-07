import { useState } from 'react'
import _ from 'lodash'

import dataService from 'Services/data.service'
import literatureService from 'Services/literature.service'
import LiteratureItemComponent from './LiteratureItemComponent'

const originalHash = document.location.hash

const getInitialPageNumber = () => {
  return originalHash.indexOf('?page=') > -1 ? parseInt(originalHash.slice(originalHash.indexOf('=') + 1)) : 1
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
    const currentHash = originalHash.indexOf('?page=') > -1 ? originalHash.slice(0, originalHash.indexOf('?')) : originalHash
    document.location.hash = `${currentHash}?page=${currentPage}`
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
      location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'))
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
