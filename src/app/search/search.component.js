import React from 'react';
import DOMPurify from '../../lib/purify.js';
import { Glyphicon } from 'react-bootstrap';
import './search.component.less';

export default class Search extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      searchClass: 'collapsed'
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  toggleSearch (event) {
    if (this.state.searchClass === 'collapsed') {
      document.querySelector('.searchInput').focus();
      this.setState({ searchClass: 'expanded' });
    } else {
      document.querySelector('.searchInput').blur();
      this.setState({ searchClass: 'collapsed' });
    }
  }

  submitSearch (event) {
    event.target.blur();
    if (window.innerWidth > 600 || this.state.searchClass === 'expanded') {
      document.location.hash = '#/search';
    } else if (window.innerWidth <= 600) {
      this.setState({ searchClass: 'expanded' });
      document.querySelector('.searchInput').focus();
    }
  }

  onChange (event) {
    const clean = DOMPurify.sanitize(event.target.value);
    this.props.updateSearchInput(clean.toLowerCase());
  }

  onKeyDown (event) {
    if (event.keyCode === 13 && event.target.value) {
      document.location.hash = '#/search';
    }
  }


  render () {
    return (
      <div className="search">
        <form id="searchForm">
          <input
            type="search"
            id="searchInput"
            className={`searchInput ${this.state.searchClass}`}
            value={this.props.searchInput}
            autoComplete={true}
            maxLength={75}
            required={true}
            onFocus={this.toggleSearch}
            onBlur={this.toggleSearch}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown} />
        </form>
        <Glyphicon onBlur={this.submitSearch} onClick={this.submitSearch} glyph="search" />
      </div>
    );
  }
}
