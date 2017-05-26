import React from 'react';
import { Modal } from 'react-bootstrap';
import './authorLitHome.component.less';

export default class AuthorLitHome extends React.Component {

  constructor (props) {
    super(props);
    const readingMode = localStorage.getItem('readingMode');
    this.state = {
      show: true,
      readingModeClass: readingMode ? readingMode : 'darkMode',
      readingModeText: readingMode && readingMode === 'lightMode' ? 'Lights Off' : 'Lights On'
    };
    this.currentWorkKey = props.match.params.work;
    this.content = require(`Literature/${this.props.data.authorKey}/${this.currentWorkKey}.html`);
    this.currentWork = this.props.data.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.pages = [];
    do {
      let page = '';
      page = this.content.slice(0, 1200);
      this.content = this.content.slice(1200);
      this.pages.push(page);
    } while(this.content.length > 1200);
    this.originalHash = document.location.hash;
    this.currentPage = 1;
  }

  setPageNum (pageNum) {
    document.location.hash = this.originalHash + `?page=${pageNum}`;
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
    const flipMode = currentMode && currentMode === 'darkMode' ? 'lightMode' : currentMode && currentMode === 'lightMode' ? 'darkMode' : 'darkMode';
    this.setState({readingModeClass: flipMode, readingModeText: flipMode === 'lightMode' ? 'Lights Off' : 'Lights On'});
    localStorage.setItem('readingMode', flipMode);
  }

  render () {
    const htmlContent = {__html: this.pages[this.currentPage - 1]}
    return (
      <div className="authorLitHome">
        <Modal
          show={this.state.show}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <h1>Portitude Reader</h1>
          </Modal.Header>
          <Modal.Header className="modalSubNav">
            <strong>More by {this.props.data.fname} {this.props.data.lname}</strong>
            <button onClick={this.setReadingMode.bind(this)} className="readingModeButton">{this.state.readingModeText}</button>
          </Modal.Header>
          <Modal.Body className={this.state.readingModeClass}>
            <Modal.Title>
              <h1>{this.currentWork.title}</h1>
              <h2>{this.props.data.fname} {this.props.data.lname}</h2>
            </Modal.Title>
            <div className="content" dangerouslySetInnerHTML={htmlContent}></div><br />
            <span><button onClick={this.setNextPage.bind(this)}>Previous Page</button></span>
            <span><button onClick={this.setNextPage.bind(this)}>Next Page</button></span>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
