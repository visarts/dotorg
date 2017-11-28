import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DOMPurify from '../../../../lib/purify.js';
import historyService from 'Services/history.service';
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
      currentPage: document.location.hash.indexOf('?page=') > -1 ? parseInt(document.location.hash.slice(document.location.hash.indexOf('=') + 1)) : 1,
      searchInput: '',
      readMoreMenuIsOpen: false,
      readingControlsAreOpen: false
    };
    this.setValues = this.setValues.bind(this);
    this.setValues();
  }

  setValues () {
    this.authorKey = this.props.match.params.author;
    this.author = this.props.store.literature[this.authorKey];
    this.currentWorkKey = this.props.match.params.work;
    this.currentWork = this.author.content.filter(work => work.fileName === this.currentWorkKey)[0];

    historyService.addToHistory({type: 'litHistory', data: Object.assign({}, this.currentWork, {author: this.author})});
    document.title = `Portitude Library: ${this.author.fname} ${this.author.lname} - ${this.currentWork.title}`;

    dataService.getHTMLContent(this.authorKey, this.currentWorkKey)
      .then((results) => {
        this.htmlContent = results;
        this.pages = [];
        for (let i in this.currentWork.pageSizes) {
          const page = this.htmlContent.slice(0, this.currentWork.pageSizes[i]);
          this.htmlContent = this.htmlContent.slice(this.currentWork.pageSizes[i]);
          this.pages.push(page);
        }

        this.originalHash = document.location.hash;
        this.setState(this.state);
      });
  }

  setPageNum (pageNum) {
    this.setState({currentPage: pageNum, readMoreMenuIsOpen: false, readingControlsAreOpen: false}, () => {
      const currentHash = this.originalHash.indexOf('?page=') > -1 ? this.originalHash.slice(0, this.originalHash.indexOf('?')) : this.originalHash;
      document.location.hash = `${currentHash}?page=${pageNum}`;
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
    //record last place
    const percentage = Math.round((parseInt(this.state.currentPage) / parseInt(this.pages.length)) * 100);
    localStorage.setItem('readtest', JSON.stringify({authorKey: this.authorKey, workKey: this.currentWorkKey, percentage}));
    //reconstruct the uri from the original, take two params off the top to return to origin
    const params = this.props.appState.getTrimmedURI(2);
    location.hash = `#/${params}`;
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

  toggleReadMoreMenu (e) {
    const newState = {
      readMoreMenuIsOpen: this.state.readMoreMenuIsOpen ? false : true,
      readingControlsAreOpen: false
    };
    this.setState(newState);
  }

  toggleReadingControls (e) {
    const newState = {
      readMoreMenuIsOpen: false,
      readingControlsAreOpen: this.state.readingControlsAreOpen ? false : true
    };
    this.setState(newState);
  }

  closeAllMenus (e) {
    if (this.state.readMoreMenuIsOpen || this.state.readingControlsAreOpen) {
      const newState = {
        readMoreMenuIsOpen: false,
        readingControlsAreOpen: false
      };
      this.setState(newState);
    }
  }

  updateSearchInput (e) {
    this.setState({searchInput: DOMPurify.sanitize(e.target.value)});
  }

  clearSearch (e) {
    this.setState({searchInput: ''});
  }

  componentWillReceiveProps (nextProps) {
    document.querySelector('.modal-body').classList.add('entered');
    if (this.props.match.params.work !== nextProps.match.params.work) {
      this.setState({currentPage: 1, searchInput: '', readMoreMenuIsOpen: false, readingControlsAreOpen: false}, () => {
        document.querySelector('.modal-body').scrollTop = 0;
        this.setValues();
      });
    }
    setTimeout(() => {
      document.querySelector('.modal-body').classList.remove('entered');
    }, 200);

  }

  render () {
    return (
      <div className="literatureDisplay">
        {this.pages && <Modal
          show={true}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal literature-modal">
          <Modal.Header closeButton>
            <span className="readingControlsToggle">
              <button className={this.state.readingControlsAreOpen ? 'active': ''} onClick={this.toggleReadingControls.bind(this)}><Glyphicon glyph="cog" /></button>
            </span>
            <h1>{this.author.lname} | {this.currentWork.genre}</h1>
          </Modal.Header>
          <div className={`readMoreMenu dropdown-menu ${this.state.readMoreMenuIsOpen ? '' : 'readMoreMenuClosed'}`}>
            <div className="literatureTitleSearch">
              <input type="text" className="literatureTitleSearchInput" value={this.state.searchInput} placeholder="Search titles..." onChange={this.updateSearchInput.bind(this)} />
              <span className={`literatureTitleSearchClear ${this.state.searchInput ? 'show' : ''}`} onClick={this.clearSearch.bind(this)} ></span>
            </div>
            <ul className="literatureTitleList">
              {this.author.content.map((item, index) => {
                const params = this.props.appState.getTrimmedURI(1);
                return (
                  <LinkContainer to={`/${params}/${item.fileName}`} key={item.title.toLowerCase()}>
                    <MenuItem eventKey={index} key={item.fileName}>{item.title}</MenuItem>
                  </LinkContainer>
                );
              }).filter((item) => {return item.key.indexOf(this.state.searchInput.toLowerCase()) > -1;})}
            </ul>
          </div>
          <div className={`readingControlsMenu ${this.state.readingControlsAreOpen ? '' : 'readingControlsMenuClosed'}`}>
            <button onClick={this.setReadingMode.bind(this)} className={`readingModeButton ${this.state.readingModeClass}`}><Glyphicon glyph="lamp" /></button>
            <button className="increaseFont" onClick={this.increaseFont.bind(this)} disabled={this.state.currentFontSizeClass === 'lgFont'}><Glyphicon glyph="plus" /></button>
            <button className="decreaseFont" onClick={this.decreaseFont.bind(this)} disabled={this.state.currentFontSizeClass === 'smFont'}><Glyphicon glyph="minus" /></button>
          </div>
          <Modal.Body className={`${this.state.readingModeClass}`} onClick={this.closeAllMenus.bind(this)}>
            <div className="readingBody">
              <div className={this.state.currentPage > 1 ? 'literatureTitle smallTitles' : 'literatureTitle'}>
                <h1>{this.currentWork.title}</h1>
                <h2 className={this.state.currentPage > 1 ? 'hidden' : ''}>{this.author.fname} {this.author.lname}</h2>
              </div>
              <div className={`htmlContent ${this.state.currentFontSizeClass}`} dangerouslySetInnerHTML={this.setHTMLContent()}></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <span className="readingMenuToggle">
            <button className={this.state.readMoreMenuIsOpen ? 'active': ''} onClick={this.toggleReadMoreMenu.bind(this)}><Glyphicon glyph="list" /></button>
          </span>
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
