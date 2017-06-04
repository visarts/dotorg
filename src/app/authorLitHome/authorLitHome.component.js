import React from 'react';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import dataService from 'Services/data.service';
import './authorLitHome.component.less';

export default class AuthorLitHome extends React.Component {

  /*
    To have scrolling on the menu:
      * Use full list with overflow hidden, scroll auto
      * Use http://jscrollpane.kelvinluck.com/ jQuery plugin to hide scroll background
      * The up/down buttons will change scroll position 
  */

  constructor (props) {
    super(props);
    const readingMode = localStorage.getItem('readingMode') ? localStorage.getItem('readingMode') : 'lightMode';
    const readingFontSize = localStorage.getItem('readingFontSize') ? localStorage.getItem('readingFontSize') : 'smFont';
    localStorage.setItem('readingMode', readingMode);
    localStorage.setItem('readingFontSize', readingFontSize);
    this.state = {
      readingModeClass: readingMode ? readingMode : 'lightMode',
      currentFontSizeClass: readingFontSize,
      currentPage: document.location.hash.indexOf('?page=') > -1 ? document.location.hash.slice(document.location.hash.indexOf('=') + 1) : 1,
      currentMenuPage: 1
    };
    this.setValues = this.setValues.bind(this);
    this.currentPage = 1;
  }

  setValues () {
    this.authorData = dataService.getAuthorData(this.props.currentAuthor.authorKey);
    this.currentWorkKey = this.props.match.params.work;
    this.currentWork = this.authorData.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.content = require(`Literature/${this.props.currentAuthor.authorKey}/${this.currentWorkKey}.html`);
    this.pages = [];
    if (this.currentWork.genre !== 'poetry') {
      let lastChar = 2000;
      let buffer = 300;
      do {
        let page = '';
        while (lastChar < this.content.length) {
          if (this.content.substring(lastChar - 4, lastChar) === '</p>') {
            break;
          } else {
            lastChar++;
          }
        }

        page = this.content.slice(0, lastChar);
        this.content = this.content.slice(lastChar);
        this.pages.push(page);
        if (this.content.length < (lastChar + buffer)) {
          page = this.content.slice(0);
          this.content = this.content.slice(lastChar + buffer);
          this.pages.push(page);
          break;
        }
      } while(this.content.length > lastChar);
    } else {
      this.pages.push(this.content);
    }
    this.menuPageMaxLength = 11;
    this.menuPages = [];
    this.menuItems = this.authorData.content.slice();
    do {
      this.menuPages.push(this.menuItems.splice(0, this.menuPageMaxLength));
      if (this.menuItems.length && this.menuItems.length < this.menuPageMaxLength) {
        this.menuPages.push(this.menuItems);
      }
    } while (this.menuItems.length > this.menuPageMaxLength);

    this.originalHash = document.location.hash;
    this.currentPage = document.location.hash.indexOf('?page=') > -1 ? document.location.hash.slice(document.location.hash.indexOf('=') + 1) : 1;
    //this.currentPage = localStorage.getItem('pageNumber') ? localStorage.getItem('pageNumber') : 1;
  }

  setPageNum (pageNum) {
    this.setState({currentPage: pageNum}, () => {
      //this.currentPage = pageNum;
      const currentHash = this.originalHash.indexOf('?page=') > -1 ? this.originalHash.slice(0, this.originalHash.indexOf('?')) : this.originalHash;
      document.location.hash = currentHash + `?page=${pageNum}`;
      document.querySelector('.modal-body').scrollTop = 0;
    });

    //localStorage.setItem('pageNumber', this.currentPage);
  }

  setNextPage () {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.setPageNum(this.currentPage);
    }
  }

  setPreviousPage () {
    if (this.currentPage > 1 && this.pages.length > 1) {
      this.currentPage--;
      this.setPageNum(this.currentPage);
    }
  }

  setNextMenuPage () {
    let currentMenuPage = this.state.currentMenuPage;
    if (this.state.currentMenuPage < this.menuPages.length) {
      this.setState({ currentMenuPage: currentMenuPage + 1 });
    }
  }

  setPreviousMenuPage () {
    let currentMenuPage = this.state.currentMenuPage;
    if (this.state.currentMenuPage > 1) {
      this.setState({ currentMenuPage: currentMenuPage - 1 });
    }
  }

  increaseFont () {
    const newFontSizeClass = this.state.currentFontSizeClass === 'smFont' ? 'mdFont' : 'lgFont';
    this.setState({ currentFontSizeClass: newFontSizeClass });
    localStorage.setItem('readingFontSize', newFontSizeClass);
  }

  decreaseFont () {
    const newFontSizeClass = this.state.currentFontSizeClass === 'lgFont' ? 'mdFont' : 'smFont';
    this.setState({ currentFontSizeClass: newFontSizeClass });
    localStorage.setItem('readingFontSize', newFontSizeClass);
  }

  hideModal () {
    //this.setState({show: false});
    location.hash = `#/literature/${this.props.currentAuthor.authorKey}`;
  }

  setReadingMode () {
    const currentMode = localStorage.getItem('readingMode');
    const flipMode = currentMode && currentMode === 'darkMode' ? 'lightMode' : currentMode && currentMode === 'lightMode' ? 'darkMode' : 'lightMode';
    this.setState({readingModeClass: flipMode });
    localStorage.setItem('readingMode', flipMode);
  }

  componentWillReceiveProps (newprops) {
    this.setState({currentPage: this.state.currentPage}, () => {
      this.setValues();
      document.querySelector('.modal-body').scrollTop = 0;
    })
  }

  setHTMLContent () {
    return {__html: this.pages[this.currentPage - 1]};
  }

  setAuthorMenu () {
    return this.menuPages[this.state.currentMenuPage - 1].map((item, index) => {
      return (
        <LinkContainer to={`/literature/${this.props.currentAuthor.authorKey}/${item.fileName}`} key={index}>
          <MenuItem eventKey={index} key={index}>{decodeURIComponent(item.title)}</MenuItem>
        </LinkContainer>
      );
    });
  }

  render () {
    this.setValues();
    return (
      <div className="authorLitHome">
        <Modal
          show={true}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <h1>Portitude Reader</h1>
          </Modal.Header>
          <div className="modal-nav">
            <span className="readingMenu">
              {this.authorData.content.length > 1 &&
                <DropdownButton title="Read More" id="bg-vertical-dropdown-1">
                  <Glyphicon glyph="chevron-up" className={`showMoreButton ${this.state.currentMenuPage === 1 ? 'buttonDisabled' : ''}`} onClick={this.setPreviousMenuPage.bind(this)} />
                    {this.setAuthorMenu()}
                  <Glyphicon glyph="chevron-down" className={`showMoreButton ${this.state.currentMenuPage === this.menuPages.length ? 'buttonDisabled' : ''}`} onClick={this.setNextMenuPage.bind(this)} />
                </DropdownButton>}
            </span>
            <span className="readingControls">
              <span className="textSizing">
                <button onClick={this.decreaseFont.bind(this)} className="decreaseFont" disabled={this.state.currentFontSizeClass === 'smFont'}><Glyphicon glyph="minus" /></button>
                <Glyphicon className="textSizingGlyph" glyph="text-size" />
                <button onClick={this.increaseFont.bind(this)} className="increaseFont"><Glyphicon glyph="plus" disabled={this.state.currentFontSizeClass === 'lgFont'} /></button>
              </span>
              <button onClick={this.setReadingMode.bind(this)} className="readingModeButton"><Glyphicon glyph="lamp" className={this.state.readingModeClass} /></button>
            </span>
          </div>
          <Modal.Body className={this.state.readingModeClass}>
            <div className="modal-title">
              <h1>{decodeURIComponent(this.currentWork.title)}</h1>
              <h2>{this.props.currentAuthor.fname} {this.props.currentAuthor.lname}</h2>
            </div>
            <div className={`htmlContent ${this.state.currentFontSizeClass}`} dangerouslySetInnerHTML={this.setHTMLContent()}></div><br />
          </Modal.Body>
          <Modal.Footer>
            {this.currentWork.genre !== 'poetry' && <div className="modal-pagination">
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, 1)} disabled={this.state.currentPage === 1} className={this.state.currentPage === 1 ? 'buttonDisabled' : ''}><Glyphicon glyph="fast-backward" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPreviousPage.bind(this)} disabled={this.state.currentPage === 1} className={this.state.currentPage === 1 ? 'buttonDisabled' : ''}><Glyphicon glyph="chevron-left" /></button></span>
              <span className="paginationLocator">{this.currentPage} of {this.pages.length}</span>
              <span className="paginationDirector"><button onClick={this.setNextPage.bind(this)} disabled={this.state.currentPage === this.pages.length} className={this.state.currentPage === this.pages.length ? 'buttonDisabled' : ''}><Glyphicon glyph="chevron-right" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, this.pages.length)} disabled={this.state.currentPage === this.pages.length} className={this.state.currentPage === this.pages.length ? 'buttonDisabled' : ''}><Glyphicon glyph="fast-forward" /></button></span>
            </div>}
            <button className="closeModal" onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
