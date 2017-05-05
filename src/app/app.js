import React from 'react';
import GlobalHeader from './globalHeader/globalHeader.component';
import GlobalNav from './globalNav/globalNav.component';
import GlobalFooter from './globalFooter/globalFooter.component';
import Routing from './routing.component';

export default class App extends React.Component {

  render () {
    return (
      <div className="appMain">
        <GlobalHeader />
        <GlobalNav />
        <Routing />
        <GlobalFooter />
      </div>
    )
  }

}
