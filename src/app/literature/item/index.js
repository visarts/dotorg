import { Component } from 'react'
import _ from 'lodash'

import dataService from 'Services/data.service'
import literatureService from 'Services/literature.service'
import ItemComponent from './literatureItem.component'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: false,
      currentPage: 0,
      modalIsOpen: true
    }
    this.item = literatureService.getItemWith(this.props.globalState.routing.collection, this.props.globalState.routing.item)
    this.pages = []
    this.setPages = this.setPages.bind(this)
    this.setFirstPage = this.setFirstPage.bind(this)
    this.setLastPage = this.setLastPage.bind(this)
    this.setNextPage = this.setNextPage.bind(this)
    this.setPreviousPage = this.setPreviousPage.bind(this)
    this.setContent.call(this)
  }

  // take the HTML and split it into an array by the items precaculated page sizes
  setPages (content) {
    let remainingContent = content
    _.map(this.item.pageSizes, pageSize => {
      this.pages.push(remainingContent.substring(0, pageSize))
      remainingContent = remainingContent.substring(pageSize)
    })
  }

  setContent () {
    dataService.getHTMLContent(this.item.creator.id, this.item.id)
      .then(content => {
        this.setPages(content)
        this.setState({content: this.pages[this.state.currentPage]})
      })
  }

  setFirstPage () {
    const currentPage = 0
    this.setState({content: this.pages[currentPage], currentPage})
  }

  setLastPage () {
    const currentPage = this.pages.length - 1
    this.setState({content: this.pages[currentPage], currentPage})
  }

  setNextPage (e) {
    const currentPage = this.state.currentPage + 1
    this.setState({content: this.pages[currentPage], currentPage})
  }

  setPreviousPage () {
    const currentPage = this.state.currentPage - 1
    this.setState({content: this.pages[currentPage], currentPage})
  }

  hideModal = () => {
    this.setState({modalIsOpen: false}, () => {
      location.hash = location.hash.substring(0, location.hash.lastIndexOf('/'))
    })
  }

  render () {
    return (
      <div>
        {this.state.content &&
          <ItemComponent
            {...this.props}
            modalIsOpen={this.state.modalIsOpen}
            hideModal={this.hideModal}
            item={this.item}
            content={this.state.content}
            setFirstPage={this.setFirstPage}
            setLastPage={this.setLastPage}
            setNextPage={this.setNextPage}
            setPreviousPage={this.setPreviousPage}
            pages={this.pages}
            currentPage={this.state.currentPage} />
        }
      </div>
    )
  }
}
