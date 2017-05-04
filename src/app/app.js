import React from 'react';
import GlobalNav from './globalNav/globalNav.component';
import Main from './main.component';

export default class App extends React.Component {

  render () {
    return (
      <div className="appMain">
        <GlobalNav />
        <Main />
      </div>
    )
  }

}
