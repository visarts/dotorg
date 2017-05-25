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
      readingModeText: readingMode && readingMode === 'lightMode' ? 'Set Dark Mode' : 'Set Light Mode'
    };
    this.currentWorkKey = props.match.params.work;
    this.content = require(`Literature/${this.props.data.authorKey}/${this.currentWorkKey}.html`);
    this.currentWork = this.props.data.content.filter(item => item.fileName === this.currentWorkKey)[0];
    this.htmlContent = {__html: this.content};

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
    this.setState({readingModeClass: flipMode, readingModeText: flipMode === 'lightMode' ? 'Set Dark Mode' : 'Set Light Mode'});
    localStorage.setItem('readingMode', flipMode);
  }

  render () {
    return (
      <div className="authorLitHome">
        <Modal
          show={this.state.show}
          onHide={this.hideModal.bind(this)}
          dialogClassName={`custom-modal ${this.state.readingModeClass}`}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <h1>{this.currentWork.title}</h1>
              <h2>{this.props.data.fname} {this.props.data.lname}</h2>
              <button onClick={this.setReadingMode.bind(this)}>{this.state.readingModeText}</button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content" dangerouslySetInnerHTML={this.htmlContent}></div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.hideModal.bind(this)}>Close</button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}
