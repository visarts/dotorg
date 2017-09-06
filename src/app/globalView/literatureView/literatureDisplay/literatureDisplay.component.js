import React from 'react';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import dataService from 'Services/data.service';
import './literatureDisplay.component.less';

export default class LiteratureDisplay extends React.Component {

  constructor (props) {
    super(props);
    const readingMode = localStorage.getItem('readingMode') ? localStorage.getItem('readingMode') : 'lightMode';
    const readingFontSize = localStorage.getItem('readingFontSize') ? localStorage.getItem('readingFontSize') : 'smFont';
    localStorage.setItem('readingMode', readingMode);
    localStorage.setItem('readingFontSize', readingFontSize);
    this.state = {
      readingModeClass: readingMode ? readingMode : 'lightMode',
      currentFontSizeClass: readingFontSize,
      currentPage: document.location.hash.indexOf('?page=') > -1 ? parseInt(document.location.hash.slice(document.location.hash.indexOf('=') + 1)) : 1
    };
    this.setValues = this.setValues.bind(this);
    this.setValues();
  }

  setValues () {
    this.authorKey = this.props.match.params.author;
    this.author = this.props.store.authorsData[this.authorKey];
    this.currentWorkKey = this.props.match.params.work;
    this.currentWork = this.author.content.filter(work => work.fileName === this.currentWorkKey)[0];
    document.title = `Portitude Library: ${this.author.fname} ${this.author.lname} - ${this.currentWork.title}`;

    dataService.getHTMLContent(this.authorKey, this.currentWorkKey)
      .then((results) => {
        this.htmlContent = results;
        this.pages = [];
        if (this.currentWork.genre !== 'poetry') {
          let lastChar = 2000;
          let buffer = 500;
          do {
            let page = '';
            while (lastChar < this.htmlContent.length) {
              if (this.htmlContent.substring(lastChar - 4, lastChar) === '</p>' || this.htmlContent.substring(lastChar - 6, lastChar) === '</pre>') {
                break;
              } else {
                lastChar++;
              }
            }

            page = this.htmlContent.slice(0, lastChar);
            this.htmlContent = this.htmlContent.slice(lastChar);
            this.pages.push(page);
            if (this.htmlContent.length > 1 && this.htmlContent.length < (lastChar + buffer)) {
              page = this.htmlContent.slice(0);
              this.htmlContent = this.htmlContent.slice(lastChar + buffer);
              this.pages.push(page);
              break;
            }
          } while(this.htmlContent.length > lastChar);
        } else {
          this.pages.push(this.htmlContent);
        }

        this.settingsMenuButtonLabel = <Glyphicon glyph="cog" />;
        this.originalHash = document.location.hash;
        this.setState(this.state);
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

  increaseFont (e) {
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
    //reconstruct the uri from the original, take two params off the top to return to origin
    let params = this.props.appState.getTrimmedURI(2);
    location.hash = `#/${params}`
  }

  setReadingMode () {
    const currentMode = localStorage.getItem('readingMode');
    const flipMode = currentMode && currentMode === 'darkMode' ? 'lightMode' : currentMode && currentMode === 'lightMode' ? 'darkMode' : 'lightMode';
    this.setState({readingModeClass: flipMode });
    localStorage.setItem('readingMode', flipMode);
    this.toggleReadingControls();
  }

  setHTMLContent () {
    return {__html: this.pages[this.state.currentPage - 1]};
  }

  toggleReadMoreMenu (toggle, e) {
    if (toggle === 'close') {
      document.querySelector('.readMoreMenu').classList.add('readMoreMenuClosed');
      document.querySelector('.readingControlsMenu').classList.add('readingControlsMenuClosed');
    } else {
      document.querySelector('.readMoreMenu').classList.toggle('readMoreMenuClosed');
      if (!document.querySelector('.readingControlsMenuClosed')) {
        document.querySelector('.readingControlsMenu').classList.add('readingControlsMenuClosed');
      }
    }
    if (!document.querySelector('.readMoreMenuClosed')) {
      //document.querySelector('.readingBody').style.filter = 'blur(2px)';
      document.querySelector('.modal-body').style.overflow = 'hidden';
    } else {
      //document.querySelector('.readingBody').style.filter = 'none';
      document.querySelector('.modal-body').style.overflow = 'auto';
    }
  }

  toggleReadingControls (e) {
    if (!document.querySelector('.readMoreMenuClosed')) {
      document.querySelector('.readMoreMenu').classList.add('readMoreMenuClosed');
    }
    document.querySelector('.readingControlsMenu').classList.toggle('readingControlsMenuClosed');
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.work !== nextProps.match.params.work) {
      this.setState({currentPage: 1}, () => {
        document.querySelector('.modal-body').scrollTop = 0;
        this.setValues();
      });
    }
  }

  render () {

    return (
      <div className="literatureDisplay">
        {this.settingsMenuButtonLabel && <Modal
          show={true}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal literature-modal">
          <Modal.Header closeButton>
            <h1>{this.author.lname} | {this.currentWork.genre}</h1>
          </Modal.Header>
          <div className="modal-nav">
            <span className="readingMenu">
              <button onClick={this.toggleReadMoreMenu.bind(this)}><Glyphicon glyph="list" /></button>
            </span>
            <span className="readingControls">
              <button onClick={this.toggleReadingControls.bind(this)}><Glyphicon glyph="cog" /></button>
            </span>
          </div>
          <div className="readMoreMenu dropdown-menu readMoreMenuClosed">
            {this.author.content.map((item, index) => {
              let params = this.props.appState.getTrimmedURI(1);
              return (
                <LinkContainer to={`/${params}/${item.fileName}`} key={index} onClick={this.toggleReadMoreMenu}>
                  <MenuItem eventKey={index} key={index}>{decodeURIComponent(item.title)}</MenuItem>
                </LinkContainer>
              )
            })}
          </div>
          <div className="readingControlsMenu readingControlsMenuClosed">
            <button onClick={this.setReadingMode.bind(this)} className={`readingModeButton ${this.state.readingModeClass}`}><Glyphicon glyph="lamp" /></button>
            <button className="increaseFont" onClick={this.increaseFont.bind(this)} disabled={this.state.currentFontSizeClass === 'lgFont'}><Glyphicon glyph="plus" /></button>
            <button className="decreaseFont" onClick={this.decreaseFont.bind(this)} disabled={this.state.currentFontSizeClass === 'smFont'}><Glyphicon glyph="minus" /></button>
          </div>
          <Modal.Body className={this.state.readingModeClass} onClick={this.toggleReadMoreMenu.bind(this, 'close')}>
            <div className="readingBody">
              <div className={this.state.currentPage > 1 ? 'literatureTitle smallTitles' : 'literatureTitle'}>
                <h1>{decodeURIComponent(this.currentWork.title)}</h1>
                <h2>{this.author.fname} {this.author.lname}</h2>
              </div>
              <div className={`htmlContent ${this.state.currentFontSizeClass}`} dangerouslySetInnerHTML={this.setHTMLContent()}></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this.currentWork.genre !== 'poetry' && <div className="modal-pagination">
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, 1)} disabled={this.state.currentPage === 1}><Glyphicon glyph="step-backward" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPreviousPage.bind(this)} disabled={this.state.currentPage === 1}><Glyphicon glyph="chevron-left" /></button></span>
              <span className="paginationLocator">{this.state.currentPage} of {this.pages.length}</span>
              <span className="paginationDirector"><button onClick={this.setNextPage.bind(this)} disabled={this.state.currentPage === this.pages.length}><Glyphicon glyph="chevron-right" /></button></span>
              <span className="paginationDirector"><button onClick={this.setPageNum.bind(this, this.pages.length)} disabled={this.state.currentPage === this.pages.length}><Glyphicon glyph="step-forward" /></button></span>
            </div>}
            {/*<button className="closeModal" onClick=this.hideModal.bind(this)>Close</button>*/}
          </Modal.Footer>

        </Modal>}
      </div>
    );
  }
}
