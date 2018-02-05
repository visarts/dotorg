import { Component } from 'react';
import _ from 'lodash';
import dataService from 'Services/data.service';
import ItemComponent from './literatureItem.component';

export default class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: false,
      currentPage: 0
    };
    this.item = this.props.globalStore.items.find(item => item.id === props.globalState.routing.item);
    this.pages = [];
    this.setPages = this.setPages.bind(this);
    this.setFirstPage = this.setFirstPage.bind(this);
    this.setLastPage = this.setLastPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
    this.setPreviousPage = this.setPreviousPage.bind(this);
    this.setContent.call(this);
  }

  // take the HTML and split it into an array by the items precaculated page sizes
  setPages (content) {
    let remainingContent = content;
    _.map(this.item.pageSizes, pageSize => {
      this.pages.push(remainingContent.substring(0, pageSize));
      remainingContent = remainingContent.substring(pageSize);
    });
  }

  setContent () {
    const itemId = this.props.globalState.routing.item;
    const authorId = itemId.split('-')[0];
    dataService.getHTMLContent(authorId, itemId)
      .then(content => {
        this.setPages(content);
        this.setState({content: this.pages[this.state.currentPage]});
      });
  }

  setFirstPage () {
    const currentPage = 0;
    this.setState({content: this.pages[currentPage], currentPage});
  }

  setLastPage () {
    const currentPage = this.pages.length - 1;
    this.setState({content: this.pages[currentPage], currentPage});
  }

  setNextPage () {
    const currentPage = this.state.currentPage + 1;
    this.setState({content: this.pages[currentPage], currentPage});
  }

  setPreviousPage () {
    const currentPage = this.state.currentPage - 1;
    this.setState({content: this.pages[currentPage], currentPage});
  }

  render () {
    return (
      <div>
        {this.state.content &&
          <ItemComponent
            {...this.props}
            content={this.state.content}
            setFirstPage={this.setFirstPage}
            setLastPage={this.setLastPage}
            setNextPage={this.setNextPage}
            setPreviousPage={this.setPreviousPage}
            pages={this.pages}
            currentPage={this.state.currentPage} />
        }
      </div>
    );
  }
}
