import * as actionTypes from '../actions/inspect/actionTypes'
import {TAG_ADDED,TAG_REMOVED,ENTRY_REMOVED} from '../actions/quasardb/actionTypes'
import {makeEntry,selectMatching} from '../helpers/entriesHelpers'

export default function tags(state, action, myAlias) {
    switch (action.type) {
    case ENTRY_REMOVED:
        if (!state) break;
        return {
            ...state,
            entries: state.entries.filter(x => x.alias != action.alias)
        }

    case TAG_ADDED:
        if (action.alias != myAlias || !state) break;
        return {
            ...state,
            entries: state.entries.concat(makeEntry(action.tag))
        }

    case TAG_REMOVED:
        if (action.alias != myAlias || !state) break;
        return {
            ...state,
            entries: state.entries.filter(entry => entry.alias != action.tag)
        }

    case actionTypes.GET_TAGS_STARTED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            entries: [],
            isFetching: true,
            error: undefined,
            paginationToken: undefined
        }

    case actionTypes.GET_TAGS_SUCCEEDED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetching: false,
            entries: action.aliases.map(makeEntry),
            paginationToken: action.paginationToken
        }

    case actionTypes.GET_TAGS_FAILED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetching: false,
            error: action.error,
            paginationToken: undefined
        }

    case actionTypes.GET_MORE_TAGS_STARTED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetchingMore: true
        }

    case actionTypes.GET_MORE_TAGS_SUCCEEDED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetchingMore: false,
            entries: state.entries.concat(action.aliases.map(makeEntry)),
            paginationToken: action.paginationToken
        }

    case actionTypes.GET_MORE_TAGS_FAILED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            isFetchingMore: false,
            error: action.error,
            paginationToken: undefined
        }

    case actionTypes.TAG_SELECTED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            entries: state.entries.map(selectMatching(action.tag, true))
        }

    case actionTypes.TAG_UNSELECTED:
        if (action.alias != myAlias) break;
        return {
            ...state,
            entries: state.entries.map(selectMatching(action.tag, false))
        }
    }

    return state;
}
