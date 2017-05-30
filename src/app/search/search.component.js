import React from 'react';
import './search.component.less';

export default class Search extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      searchClass: 'collapsed'
    };
    this.expandSearch = this.expandSearch.bind(this);
    this.collapseSearch = this.collapseSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  expandSearch () {
    this.setState({ searchClass: 'expanded'});
  }

  collapseSearch () {
    this.setState({ searchClass: 'collapsed' });
  }

  onChange (event) {

    this.props.updateSearchInput(event.target.value);
    /*const userInput = event.target.value.toLowerCase();
    if (this.artistNames.indexOf(userInput) > -1) {
      console.log('is an artist');
    } else if (this.authorNames.indexOf(userInput) > -1) {
      console.log('is an author');
    }*/
  }

  onKeyDown (event) {
    if (event.keyCode === 13 && event.target.value) {
      document.location.hash = '#/search';
    }
  }

  render () {
    return (
      <div className="search">
        <input
          type="text"
          id="searchInput"
          className={`searchInput ${this.state.searchClass}`}
          value={this.state.searchInput}
          onFocus={this.expandSearch}
          onBlur={this.collapseSearch}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown} />
      </div>
    );
  }
}
