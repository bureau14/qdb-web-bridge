import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [thunk];

if (process.env.NODE_ENV != 'production') {
    if (!window.devToolsExtension) {
        // no extension installed in browser -> add logger
        middlewares.push(require('redux-logger')());
    }

    middlewares.push(require('redux-immutable-state-invariant')());
}

let enhancer = applyMiddleware(...middlewares);

if (process.env.NODE_ENV != 'production') {
    if (window.devToolsExtension) {
        enhancer = compose(enhancer, window.devToolsExtension());
    }
}

export function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        enhancer
    );
}