import { Route, Switch } from 'react-router-dom';
import HomeView from './homeView/homeView.component';
import ArtsView from './artsView/artsView.component';
import LiteratureView from './literatureView/literatureView.component';
import SearchView from './searchView/searchView.component';
import TestView from './testView/testView.component';

const GlobalView = (props) => {

  return (
    <div className={`globalView ${props.appState.routing.currentSection === '' ? '' : 'subPage'}`}>
      <div className="globalContainer">
        <Switch location={props.location} key={props.location.key}>
          <Route exact path='/' render={routeProps => (
            <HomeView
              store={props.store}
              appState={props.appState}
              updateAppState={props.updateAppState}
              {...routeProps} />
          )} />
          <Route path="/literature" render={routeProps => (
            <LiteratureView
              store={props.store}
              appState={props.appState}
              updateAppState={props.updateAppState}
              {...routeProps} />
          )} />
          <Route path="/artwork" render={routeProps => (
            <ArtsView
              store={props.store}
              appState={props.appState}
              updateAppState={props.updateAppState}
              {...routeProps} />
          )} />
          <Route path="/search" render={routeProps => (
            <SearchView
              store={props.store}
              appState={props.appState}
              updateAppState={props.updateAppState}
              {...routeProps} />
          )} />
          <Route exact path="/test" component={TestView} />
        </Switch>
      </div>
    </div>
  );
};

export default GlobalView;
