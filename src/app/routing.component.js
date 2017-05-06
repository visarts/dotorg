import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home.component';
import LitHome from './litHome/litHome.component';
import ArtsHome from './artsHome/artsHome.component';
import Aesop from './authors/aesop.component';


const Routing = (props) => {

  const routes = [
    {
      path: '/literature',
      component: LitHome
    }
  ];

  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/literature' component={LitHome} />
      <Route exact path='/literature/:author' component={Aesop} />
      <Route path='/arts' component={ArtsHome} />
    </div>
  );
}

export default Routing;
