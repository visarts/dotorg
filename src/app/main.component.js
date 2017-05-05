import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home.component';
import ArtsHome from './artsHome/artsHome.component';


const Main = (props) => {
  return (
    <main className="section">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/arts' component={ArtsHome} />
      </Switch>
    </main>
  );
}

export default Main;
