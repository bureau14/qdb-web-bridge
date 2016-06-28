import qdb from '../../api/QuasardbApi.js';
import {SEARCH_STARTED,SEARCH_SUCCEEDED,SEARCH_FAILED} from './actionTypes'

export default function search(mode, text) {
    return dispatch => {
        dispatch(searchStarted(mode, text))
        return qdb.search(mode, text)
            .then(response => {
                dispatch(searchSucceeded(mode, text, response.aliases, response.funcs.next))
            }, error => {
                dispatch(searchFailed(mode, text, error))
            })
    }
}

    function searchStarted(mode, text) {
        return {
            type: SEARCH_STARTED,
            mode, text
        }
    }

    function searchSucceeded(mode, text, aliases, paginationToken) {
        return {
            type: SEARCH_SUCCEEDED,
            mode, text, aliases, paginationToken
        }
    }

    function searchFailed(mode, text, error) {
        return {
            type: SEARCH_FAILED,
            mode, text, error
        }
    }
