import React from 'react';
import { Modal } from 'react-bootstrap';
import './authorLitHome.component.less';

export default class AuthorLitHome extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      show: true
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

  render () {
    return (
      <div className="authorLitHome">
        <Modal
          show={this.state.show}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <h1>{this.currentWork.title}</h1>
              <h2>{this.props.data.fname} {this.props.data.lname}</h2>
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
