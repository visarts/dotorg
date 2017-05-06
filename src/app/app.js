import React from 'react';
import {getAuthors, getArtists} from 'Services/config.service';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import Routing from './routing.component';

export default class App extends React.Component {

  constructor () {
    super();
    this.authorsData = getAuthors();
    this.artistsData = getArtists();
  }
  render () {
    console.log(getAuthors());
    console.log(getArtists());


    return (
      <div className="appMain">
        <GlobalHeader />
        <GlobalNav />
        <Routing authorsData={this.authorsData} artistsData={this.artistsData} />
        <GlobalFooter />
      </div>
    )
  }

}
