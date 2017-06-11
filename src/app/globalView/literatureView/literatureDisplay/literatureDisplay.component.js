import React from 'react';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import dataService from 'Services/data.service';
import './literatureDisplay.component.less';

export default class LiteratureDisplay extends React.Component {

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
    this.props = props;
    localStorage.setItem('readingMode', readingMode);
    localStorage.setItem('readingFontSize', readingFontSize);
    this.state = {
      readingModeClass: readingMode ? readingMode : 'lightMode',
      currentFontSizeClass: readingFontSize,
      currentPage: document.location.hash.indexOf('?page=') > -1 ? parseInt(document.location.hash.slice(document.location.hash.indexOf('=') + 1)) : 1,
      currentMenuPage: 1,
      menuIsOpen: false
    };
    this.setValues = this.setValues.bind(this);

  }

  setValues () {
    this.authorData = dataService.getAuthorData(this.props.currentAuthor.authorKey);
    this.currentWorkKey = this.props.match.params.work;
    this.currentWork = this.authorData.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.content = require(`Literature/${this.props.currentAuthor.authorKey}/${this.currentWorkKey}.html`);
    this.pages = [];
    if (this.currentWork.genre !== 'poetry') {
      let lastChar = 2000;
      let buffer = 500;
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
        if (this.content.length && this.content.length < (lastChar + buffer)) {
          page = this.content.slice(0);
          this.content = this.content.slice(lastChar + buffer);
          this.pages.push(page);
          break;
        }
      } while(this.content.length > lastChar);
    } else {
      this.pages.push(this.content);
    }
    this.smallViewSize = 768;
    this.menuPageMaxLength = window.innerWidth <= this.smallViewSize ? 9 : 12;
    this.menuPages = [];
    this.menuItems = this.authorData.content.slice();
    do {
      this.menuPages.push(this.menuItems.splice(0, this.menuPageMaxLength));
      if (this.menuItems.length && this.menuItems.length < this.menuPageMaxLength) {
        this.menuPages.push(this.menuItems);
      }
    } while (this.menuItems.length > this.menuPageMaxLength);


    this.authorMenuButtonLabel = window.innerWidth <= this.smallViewSize ? <Glyphicon glyph="th" /> : <span>Read More by {this.props.currentAuthor.lname} <Glyphicon glyph="chevron-down" /></span>;
    this.originalHash = document.location.hash;
    this.authorMenu = this.menuPages[this.state.currentMenuPage - 1].map((item, index) => {
      return (
        <LinkContainer to={`/literature/${this.props.currentAuthor.authorKey}/${item.fileName}`} key={index}>
          <MenuItem eventKey={index} key={index}>{decodeURIComponent(item.title)}</MenuItem>
        </LinkContainer>
      );
    });
  }

  setPageNum (pageNum) {
    this.setState({currentPage: pageNum}, () => {
      const currentHash = this.originalHash.indexOf('?page=') > -1 ? this.originalHash.slice(0, this.originalHash.indexOf('?')) : this.originalHash;
      document.location.hash = currentHash + `?page=${pageNum}`;
      document.querySelector('.modal-body').scrollTop = 0;
    });

  }

  setNextPage () {
    if (this.state.currentPage < this.pages.length) {
      this.state.currentPage++;
      this.setPageNum(this.state.currentPage);
    }
  }

  setPreviousPage () {
    if (this.state.currentPage > 1 && this.pages.length > 1) {
      this.state.currentPage--;
      this.setPageNum(this.state.currentPage);
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
    location.hash = `#/literature/${this.props.currentAuthor.authorKey}`;
  }

  setReadingMode () {
    const currentMode = localStorage.getItem('readingMode');
    const flipMode = currentMode && currentMode === 'darkMode' ? 'lightMode' : currentMode && currentMode === 'lightMode' ? 'darkMode' : 'lightMode';
    this.setState({readingModeClass: flipMode });
    localStorage.setItem('readingMode', flipMode);
  }

  setHTMLContent () {
    return {__html: this.pages[this.state.currentPage - 1]};
  }

  onMenuClick (event) {
    const menuIsOpen = document.querySelector('.open');
    this.setState({ menuIsOpen: !this.state.menuIsOpen }, () => {
      if (this.state.menuIsOpen) {
        document.querySelector('.readerOverlay').style.display = 'block';
      } else {
        if (menuIsOpen && menuIsOpen.className !== 'dropdown open btn-group') {
          document.querySelector('.readerOverlay').style.display = 'none';
        }

      }
    });
  }

  onMenuBlur (event) {

  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.work !== nextProps.match.params.work) {
      this.setState({currentPage: 1}, () => {
        this.setValues();
        document.querySelector('.modal-body').scrollTop = 0;
      });
    }
  }

  render () {
    this.setValues();
    return (
      <div className="literatureDisplay">
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
                <DropdownButton noCaret title={this.authorMenuButtonLabel} id="bg-vertical-dropdown-1" className="readerDropdown" onClick={this.onMenuClick.bind(this)} onBlur={this.onMenuBlur.bind(this)}>
                  <Glyphicon glyph="menu-up" disabled={this.state.currentMenuPage === 1} className={`showMoreButton ${this.state.currentMenuPage === 1 ? 'buttonDisabled' : ''}`} onClick={this.setPreviousMenuPage.bind(this)} />
                    {this.authorMenu}
                  <Glyphicon glyph="menu-down" disabled={this.state.currentMenuPage === this.menuPages.length} className={`showMoreButton ${this.state.currentMenuPage === this.menuPages.length ? 'buttonDisabled' : ''}`} onClick={this.setNextMenuPage.bind(this)} />
                </DropdownButton>}
            </span>
            <span className="readingControls">
              <span className="textSizing">
                <button onClick={this.decreaseFont.bind(this)} className="decreaseFont" disabled={this.state.currentFontSizeClass === 'smFont'}><Glyphicon glyph="minus" /></button>
                {false && <Glyphicon className="textSizingGlyph" glyph="text-size" />}
                <button onClick={this.increaseFont.bind(this)} className="increaseFont" disabled={this.state.currentFontSizeClass === 'lgFont'}><Glyphicon glyph="plus" /></button>
              </span>
              <button onClick={this.setReadingMode.bind(this)} className="readingModeButton"><Glyphicon glyph="lamp" className={this.state.readingModeClass} /></button>
            </span>
          </div>
          <Modal.Body className={this.state.readingModeClass}>
            <div className={this.state.currentPage > 1 ? 'modal-title smallTitles' : 'modal-title'}>
              <h1>{decodeURIComponent(this.currentWork.title)}</h1>
              <h2>{this.props.currentAuthor.fname} {this.props.currentAuthor.lname}</h2>
            </div>
            <div className={`htmlContent ${this.state.currentFontSizeClass}`} dangerouslySetInnerHTML={this.setHTMLContent()}></div><br />
          </Modal.Body>
          <Modal.Body className="readerOverlay"></Modal.Body>
          <Modal.Footer>
            {this.currentWork.genre !== 'poetry' && <div className="modal-pagination">
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, 1)} disabled={this.state.currentPage === 1}><Glyphicon glyph="step-backward" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPreviousPage.bind(this)} disabled={this.state.currentPage === 1}><Glyphicon glyph="chevron-left" /></button></span>
              <span className="paginationLocator">{this.state.currentPage} of {this.pages.length}</span>
              <span className="paginationDirector"><button onClick={this.setNextPage.bind(this)} disabled={this.state.currentPage === this.pages.length}><Glyphicon glyph="chevron-right" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, this.pages.length)} disabled={this.state.currentPage === this.pages.length}><Glyphicon glyph="step-forward" /></button></span>
            </div>}
            <button className="closeModal" onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
