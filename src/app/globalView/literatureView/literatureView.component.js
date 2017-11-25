import { Route } from 'react-router-dom';
import LiteratureHome from './literatureHome/literatureHome.component';
import LiteratureAuthor from './literatureAuthor/literatureAuthor.component';
import LiteratureGenre from './literatureGenre/literatureGenre.component';
import LiteratureDisplay from './literatureDisplay/literatureDisplay.component';

const LiteratureView = (props) => {
  return (
    <div className="literatureView">
      <Route exact path='/literature' render={routeProps => (
        <LiteratureHome
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/literature/g/:genre' render={routeProps => (
        <LiteratureGenre
          store={props.store}
          appState={props.appState}
          {...routeProps} />
      )} />
      <Route path='/literature/a/:author' render={routeProps => (
          <LiteratureAuthor
            store={props.store}
            appState={props.appState}
            {...routeProps} />
      )} />
      <Route path='/literature/a/:author/:genre/:work' render={routeProps => (
          <LiteratureDisplay
            store={props.store}
            appState={props.appState}
            {...routeProps} />
      )} />
      <Route path='/literature/g/:genre/:author/:work' render={routeProps => (
          <LiteratureDisplay
            store={props.store}
            appState={props.appState}
            {...routeProps} />
      )} />
    </div>
  );
};

export default LiteratureView
