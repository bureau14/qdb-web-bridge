import "babel-polyfill";

import React                    from 'react'
import ReactDOM                 from 'react-dom'
import {Router,Route}           from 'react-router'
import {hashHistory as history} from 'react-router'
import {Provider}               from 'react-redux'
import {configureStore}         from './stores'

import App         from './components/App.jsx';
import ConsolePage from './components/console/ConsolePage.jsx';
import GraphsPage  from './components/graphs/GraphsPage.jsx';
import HealthPage  from './components/health/HealthPage.jsx';
import InspectPage from './components/inspect/InspectPage.jsx';
import SearchPage  from './components/search/SearchPage.jsx';

import {getEntry} from './actions/inspect';
import {search}    from './actions/search'
import {sameCriteria} from './helpers/searchHelpers'

const store = configureStore();
const dispatch = store.dispatch;

function getEntryIfNotInStore({alias}) {
    const state = store.getState();
    if (!state.entries[alias]) {
        return dispatch(getEntry(alias));
    } else {
        return Promise.resolve()
    }
}

function onInspectRouteEnter(nextState, replace, callback) {
    getEntryIfNotInStore(nextState.params).then(() => {callback()});
}

function onInspectRouteChange(prevState, nextState, replace, callback) {
    getEntryIfNotInStore(nextState.params).then(() => {callback()});
}

function onSearchRouteEnter(nextState) {
    const {mode,text} = nextState.location.query;
    if (text) {
        dispatch(search(mode, text));
    }
}

function onSearchRouteChange(prevState, nextState) {
    const prevSearch = prevState.location.query;
    const nextSearch = nextState.location.query;
    if (!sameCriteria(prevSearch, nextSearch)) {
        dispatch(search(nextSearch.mode, nextSearch.text));
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route name="app" path="/" component={App}>
                <Route path="/console" component={ConsolePage}/>
                <Route path="/graphs" component={GraphsPage}/>
                <Route path="/health" component={HealthPage}/>
                <Route path="/inspect/:alias" component={InspectPage}
                    onEnter={onInspectRouteEnter}
                    onChange={onInspectRouteChange} />
                <Route path="/search" component={SearchPage}
                    onEnter={onSearchRouteEnter}
                    onChange={onSearchRouteChange} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'));
