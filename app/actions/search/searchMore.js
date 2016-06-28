import {SEARCH_MORE_STARTED,SEARCH_MORE_SUCCEEDED,SEARCH_MORE_FAILED} from './actionTypes'

export function searchMore(paginationToken) {
    return dispatch => {
        dispatch(searchMoreStarted());
        return paginationToken()
            .then(
                response => dispatch(searchMoreSucceeded(response.aliases, response.funcs.next)),
                error => dispatch(searchMoreFailed(error))
            );
    }
}

    function searchMoreStarted() {
        return {
            type: SEARCH_MORE_STARTED
        }
    }

    function searchMoreSucceeded(aliases, paginationToken) {
        return {
            type: SEARCH_MORE_SUCCEEDED,
            aliases, paginationToken
        }
    }

    function searchMoreFailed(error) {
        return {
            type: SEARCH_MORE_FAILED,
            error
        }
    }