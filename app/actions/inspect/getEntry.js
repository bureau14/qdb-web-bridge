import qdb from '../../api/QuasardbApi.js';
import {GET_ENTRY_STARTED,GET_ENTRY_SUCCEEDED,GET_ENTRY_FAILED} from './actionTypes'

export function getEntry(alias) {
    return dispatch => {
        dispatch(getEntryStarted(alias));
        return qdb.getEntry(alias)
            .then(
                response => dispatch(getEntrySucceeded(alias, response)),
                error => dispatch(getEntryFailed(alias, error))
            )
    }
}

    function getEntryStarted(alias) {
        return {
            type: GET_ENTRY_STARTED,
            alias
        }
    }

    function getEntrySucceeded(alias, entry) {
        return {
            type: GET_ENTRY_SUCCEEDED,
            alias, entry
        }
    }

    function getEntryFailed(alias, error) {
        return {
            type: GET_ENTRY_FAILED,
            alias, error
        }
    }
