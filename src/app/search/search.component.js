import React from 'react';
import DOMPurify from '../../lib/purify.js';
import { Glyphicon } from 'react-bootstrap';
import './search.component.less';

export default class Search extends React.Component {

  /*
    Functionality:
    SEARCH FIELD - DESKTOP
      onClick = expand search field, darken screen
      onEnter = collapse search field, lighten screen, change hash, blur
      onBlur  = collapse search field, lighten screen
      onFocus = expand search field, darken screen

    SEARCH BUTTON - DESKTOP
      onClick = collapse search field, lighten screen, change hash, blur
      onEnter = collapse search field, lighten screen, change hash, blur
      onBlur  = collapse search field, lighten screen

    SEARCH FIELD - MOBILE
      onEnter = collapse search field, lighten screen, change hash, blur
      onBlur  = collapse search field, lighten screen

    SEARCH BUTTON - MOBILE
      onClick (when search is collapsed) = expand search field, darken screen, focus search field
      onClick (when search is expanded)  = collapse search field, lighten screen, change hash, blur
  */

  constructor (props) {
    super(props);
    this.state = {
      searchClass: 'collapsed'
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.focusSearchField = this.focusSearchField.bind(this);
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

      document.querySelector('.searchInput').removeEventListener('onClick', this.focusSearchField);

    }
  }

  focusSearchField () {
    document.querySelector('.searchInput').focus();
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
        <Glyphicon
          onClick={this.submitSearch}
          glyph="search" />
      </div>
    );
  }
}
