import React from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import './authorLitHome.component.less';

export default class AuthorLitHome extends React.Component {

  constructor (props) {
    super(props);
    const readingMode = localStorage.getItem('readingMode');
    this.state = {
      show: true,
      readingModeClass: readingMode ? readingMode : 'lightMode',
      readingModeText: readingMode && readingMode === 'lightMode' ? 'Lights Off' : 'Lights On'
    };
    this.currentWorkKey = props.match.params.work;
    this.content = require(`Literature/${this.props.data.authorKey}/${this.currentWorkKey}.html`);
    this.currentWork = this.props.data.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.pages = [];
    do {
      let page = '';
      page = this.content.slice(0, 1400);
      this.content = this.content.slice(1400);
      this.pages.push(page);
      if (this.content.length < 1400) {
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

  showModal () {
    this.setState({show: true});
  }

  hideModal () {
    this.setState({show: false});
    location.hash = `#/literature/${this.props.data.authorKey}`;
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
            <strong>More by {this.props.data.fname} {this.props.data.lname}</strong>
            <button onClick={this.setReadingMode.bind(this)} className="readingModeButton">{this.state.readingModeText}</button>
          </div>
          <Modal.Body className={this.state.readingModeClass}>
            <Modal.Title>
              <h1>{this.currentWork.title}</h1>
              <h2>{this.props.data.fname} {this.props.data.lname}</h2>
            </Modal.Title>
            <div className="content" dangerouslySetInnerHTML={htmlContent}></div><br />

          </Modal.Body>
          <Modal.Footer>
            <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, 1)} disabled={this.currentPage === 1} className={this.currentPage === 1 ? 'paginationDisabled' : ''}><Glyphicon glyph="fast-backward" /></button></span>
            <span className="paginationDirector"><button onClick={this.setPreviousPage.bind(this)} disabled={this.currentPage === 1} className={this.currentPage === 1 ? 'paginationDisabled' : ''}><Glyphicon glyph="chevron-left" /></button></span>
            <span className="paginationLocator">Page {this.currentPage} of {this.pages.length}</span>
            <span className="paginationDirector"><button onClick={this.setNextPage.bind(this)} disabled={this.currentPage === this.pages.length} className={this.currentPage === this.pages.length ? 'paginationDisabled' : ''}><Glyphicon glyph="chevron-right" /></button></span>
            <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, this.pages.length)} disabled={this.currentPage === this.pages.length} className={this.currentPage === this.pages.length ? 'paginationDisabled' : ''}><Glyphicon glyph="fast-forward" /></button></span>
            <button className="closeModal" onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
