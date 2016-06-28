import * as actionTypes from '../actions/inspect/actionTypes'
import tagged from './entries.tagged';
import tags from './entries.tags';

function entry(state={}, action, myAlias) {
    switch (action.type) {
    case actionTypes.GET_ENTRY_STARTED:
        if (action.alias != myAlias) break;
        return {
            isFetching: true
        }

    case actionTypes.GET_ENTRY_SUCCEEDED:
        if (action.alias != myAlias) break;
        return {
            isFetching: false,
            entryType: action.entry.type,
            size: action.entry.size,
            mime: action.entry.mime
        }

    case actionTypes.GET_ENTRY_FAILED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetching: false,
            error: action.error
        }
    }

    return {
        ...state,
        tagged: tagged(state.tagged, action, myAlias),
        tags: tags(state.tags, action, myAlias)
    }
}


export default function entries(state={}, action) {
    const newState = {};
    newState[action.alias] = entry(state[action.alias], action, action.alias);
    for (let alias in state) {
        if (action.alias == alias) continue;
        newState[alias] = entry(state[alias], action, alias);
    }
    return newState;
}