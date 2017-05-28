import React from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
import './authorLitHome.component.less';

export default class AuthorLitHome extends React.Component {

  constructor (props) {
    super(props);
    const readingMode = localStorage.getItem('readingMode') ? localStorage.getItem('readingMode') : 'lightMode';
    const readingFontSize = localStorage.getItem('readingFontSize') ? localStorage.getItem('readingFontSize') : 'smFont';
    localStorage.setItem('readingMode', readingMode);
    localStorage.setItem('readingFontSize', readingFontSize);
    this.state = {
      show: true,
      readingModeClass: readingMode ? readingMode : 'lightMode',
      readingModeText: readingMode === 'lightMode' ? 'Lights Off' : 'Lights On',
      currentFontSizeClass: readingFontSize
    };
    this.authorData = dataService.getAuthorData(this.props.currentAuthor.authorKey);
    this.currentWorkKey = props.match.params.work;
    this.currentWork = this.authorData.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.content = require(`Literature/${this.props.currentAuthor.authorKey}/${this.currentWorkKey}.html`);
    this.pages = [];
    do {
      let page = '';
      let lastChar = 2000;
      while (this.content[lastChar - 1] !== ' ') {
        lastChar--;
      }

      page = this.content.slice(0, lastChar);
      this.content = this.content.slice(lastChar);
      this.pages.push(page);
      if (this.content.length < lastChar) {
        page = this.content.slice(0);
        this.pages.push(page);
      }
    } while(this.content.length > 1100);
    this.originalHash = document.location.hash;
    this.currentPage = document.location.hash.indexOf('?page=') > -1 ? document.location.hash.slice(document.location.hash.indexOf('=') + 1) : 1;
  }

  setPageNum (pageNum) {
    this.currentPage = pageNum;
    const currentHash = this.originalHash.indexOf('?page=') > -1 ? this.originalHash.slice(0, this.originalHash.indexOf('?')) : this.originalHash;
    document.location.hash = currentHash + `?page=${pageNum}`;
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

  showModal () {
    this.setState({show: true});
  }

  hideModal () {
    this.setState({show: false});
    location.hash = `#/literature/${this.props.currentAuthor.authorKey}`;
  }

  setReadingMode () {
    const currentMode = localStorage.getItem('readingMode');
    const flipMode = currentMode && currentMode === 'darkMode' ? 'lightMode' : currentMode && currentMode === 'lightMode' ? 'darkMode' : 'lightMode';
    this.setState({readingModeClass: flipMode, readingModeText: flipMode === 'lightMode' ? 'Lights Off' : 'Lights On'});
    localStorage.setItem('readingMode', flipMode);
  }

  render () {
    const htmlContent = {__html: this.pages[this.currentPage - 1]};
    return (
      <div className="authorLitHome">
        <Modal
          show={this.state.show}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <h1>Portitude Reader</h1>
          </Modal.Header>
          <div className="modal-nav">
            <strong>More by {this.props.currentAuthor.fname} {this.props.currentAuthor.lname}</strong>
            <span className="readingControls">
              <button onClick={this.decreaseFont.bind(this)} className="decreaseFont" disabled={this.state.currentFontSizeClass === 'smFont'}><Glyphicon glyph="minus" /></button>
              <button onClick={this.increaseFont.bind(this)} className="increaseFont"><Glyphicon glyph="plus" disabled={this.state.currentFontSizeClass === 'lgFont'} /></button>
              <button onClick={this.setReadingMode.bind(this)} className="readingModeButton">{this.state.readingModeText}</button>
            </span>
          </div>
          <Modal.Body className={this.state.readingModeClass}>
            <div className="modal-title">
              <h1>{this.currentWork.title}</h1>
              <h2>{this.props.currentAuthor.fname} {this.props.currentAuthor.lname}</h2>
            </div>
            <div className={`htmlContent ${this.state.currentFontSizeClass}`} dangerouslySetInnerHTML={htmlContent}></div><br />

          </Modal.Body>
          <Modal.Footer>
            <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, 1)} disabled={this.currentPage === 1} className={this.currentPage === 1 ? 'buttonDisabled' : ''}><Glyphicon glyph="fast-backward" /></button></span>
            <span className="paginationDirector"><button onClick={this.setPreviousPage.bind(this)} disabled={this.currentPage === 1} className={this.currentPage === 1 ? 'buttonDisabled' : ''}><Glyphicon glyph="chevron-left" /></button></span>
            <span className="paginationLocator">{this.currentPage} of {this.pages.length}</span>
            <span className="paginationDirector"><button onClick={this.setNextPage.bind(this)} disabled={this.currentPage === this.pages.length} className={this.currentPage === this.pages.length ? 'buttonDisabled' : ''}><Glyphicon glyph="chevron-right" /></button></span>
            <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, this.pages.length)} disabled={this.currentPage === this.pages.length} className={this.currentPage === this.pages.length ? 'buttonDisabled' : ''}><Glyphicon glyph="fast-forward" /></button></span>
            <button className="closeModal" onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
