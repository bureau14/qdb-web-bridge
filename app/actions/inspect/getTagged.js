import qdb from '../../api/QuasardbApi.js';
import {GET_TAGGED_STARTED,GET_TAGGED_SUCCEEDED,GET_TAGGED_FAILED} from './actionTypes'

export function getTagged(alias) {
    return dispatch => {
        dispatch(getTaggedStarted(alias));
        return qdb
            .getTagged(alias)
            .then(
                response => dispatch(getTaggedSucceeded(alias, response.aliases, response.funcs.next)),
                error => dispatch(getTaggedFailed(alias, error))
            )
    }
}

    function getTaggedStarted(alias) {
        return {
            type: GET_TAGGED_STARTED,
            alias
        }
    }

    function getTaggedSucceeded(alias, aliases, paginationToken) {
        return {
            type: GET_TAGGED_SUCCEEDED,
            alias, aliases, paginationToken
        }
    }

    function getTaggedFailed(alias, error) {
        return {
            type: GET_TAGGED_FAILED,
            alias, error
        }
    }

