import {combineReducers} from 'redux'

import consoleReducer from './console'
import entries from './entries'
import search from './search'

const rootReducer = combineReducers({
    console: consoleReducer,
    search,
    entries
});

export default rootReducer