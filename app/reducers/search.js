import * as actionTypes from '../actions/search/actionTypes'
import {sameCriteria} from '../helpers/searchHelpers'
import {makeEntry,selectMatching} from '../helpers/entriesHelpers'
import {ENTRY_REMOVED} from '../actions/quasardb/actionTypes'

const initialState = {
    mode: 'prefix',
    text: '',
    entries: []
}

export default function search(state=initialState, action) {
    switch (action.type) {
    case actionTypes.SEARCH_STARTED:
        return {
            ...state,
            text: action.text,
            mode: action.mode,
            entries: [],
            error: undefined,
            paginationToken: undefined,
            isSearching: true
        }

    case actionTypes.SEARCH_FAILED:
        // ignore notification from an older search
        if (!sameCriteria(state, action)) break;

        return {
            ...state,
            collection: action.collection,
            error: action.error,
            isSearching: false
        }

     case actionTypes.SEARCH_SUCCEEDED:
        // ignore notification from an older search
        if (!sameCriteria(state, action)) break;

        return {
            ...state,
            entries: action.aliases.map(makeEntry),
            paginationToken: action.paginationToken,
            isSearching: false
        }

    case actionTypes.SEARCH_MORE_STARTED:
        return {
            ...state,
            isFetchingMore: true
        }

    case actionTypes.SEARCH_MORE_SUCCEEDED:
        return {
            ...state,
            isFetchingMore: false,
            entries: state.entries.concat(action.aliases.map(makeEntry)),
            paginationToken: action.paginationToken
        }

    case actionTypes.SEARCH_MORE_FAILED:
        return {
            ...state,
            isFetchingMore: false,
            error: action.error,
            paginationToken: undefined
        }

    case actionTypes.RESULT_SELECTED:
        return {
            ...state,
            entries: state.entries.map(selectMatching(action.alias, true))
        }

    case actionTypes.RESULT_UNSELECTED:
        return {
            ...state,
            entries: state.entries.map(selectMatching(action.alias, false))
        }

    case ENTRY_REMOVED:
        return {
            ...state,
            entries: state.entries.filter(x => x.alias != action.alias)
        }
    }

    return state;
}
