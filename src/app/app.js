import { Route, Switch } from 'react-router-dom';
import dataService from 'Services/data.service';
import storeService from 'Services/store.service';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import GlobalHeader from './_global/header/globalHeader.component';
import GlobalNav from './_global/navigation/globalNav.component';
import GlobalFooter from './_global/footer/globalFooter.component';

import HomeContainer from './home/home.container';

import ArtworkIndex from './artwork/artwork.index';
import LiteratureIndex from './literature/literature.index';


export default class App extends React.Component {

  constructor (props) {
    super(props);
    storeService.setStore(this.props.data);
    this.globalStore = storeService.getStore();
    this.updateAppState = this.updateAppState.bind(this);
    this.currentLocation = location.hash.slice(1);
    this.state = {
      routing: dataService.getRoutingState(this.currentLocation)
    };
  }

  updateAppState (newState) {
    this.setState(Object.assign(this.state, newState));
  }

  // allows for routing changes in modals and the like when origin is unknown
  /*getTrimmedURI (num) {
    if (num) {
      const params = location.hash.slice(2).split('/');
      for (let i = 0; i < num; i++) {
        params.pop();
      }
      const newParams = params.join('/');
      return newParams;
    }
  }*/


  // this will update when the route changes and set state with new params
  componentWillReceiveProps (nextProps) {
    const updatedLocation = nextProps.location.pathname;
    if (this.currentLocation !== updatedLocation) {
      this.setState({routing: dataService.getRoutingState(updatedLocation)}, () => {
        this.currentLocation = updatedLocation;
      });
    }
  }

  render () {

    /* TODO
      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately
          -- could use same category as novels, when those are added, as 'chaptered' content

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      Add middle tier sizing layout for tablets, etc

      Add historical memory for read completion in literature

      refactor arts carousel to use css animation and a single array

      refactor history display into carousel

    */
    // className={`portitude ${this.state.routing.currentSection}`}
    // console.log(this.globalStore);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="portitude">
          <GlobalHeader
            globalState={this.state}
            globalStore={this.globalStore} />
          <GlobalNav
            globalState={this.state}
            globalStore={this.globalStore} />
          <div className="view">
            <Route exact path="/" render={routeProps => (
              <HomeContainer
                globalStore={this.globalStore}
                globalState={this.state}
                {...routeProps} />
            )} />
            <Route path="/artwork" render={routeProps => (
              <ArtworkIndex
                globalStore={this.globalStore.artwork}
                globalState={this.state}
                {...routeProps} />
            )} />
            <Route path="/literature" render={routeProps => (
              <LiteratureIndex
                globalStore={this.globalStore.literature}
                globalState={this.state}
                {...routeProps} />
            )} />
          </div>
          <GlobalFooter
            globalState={this.state}
            globalStore={this.globalStore} />
        </div>
      </MuiThemeProvider>
    );
  }
}
