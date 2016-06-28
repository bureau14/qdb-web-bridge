import {GET_MORE_TAGGED_STARTED,GET_MORE_TAGGED_SUCCEEDED,GET_MORE_TAGGED_FAILED} from './actionTypes'

export function getMoreTagged(alias, paginationToken) {
    return dispatch => {
        dispatch(getMoreTaggedStarted(alias, ));
        return paginationToken()
            .then(
                response => dispatch(getMoreTaggedSucceeded(alias, response.aliases, response.funcs.next)),
                error => dispatch(getMoreTaggedFailed(alias, error))
            );
    }
}

    function getMoreTaggedStarted(alias) {
        return {
            type: GET_MORE_TAGGED_STARTED,
            alias
        }
    }

    function getMoreTaggedSucceeded(alias, aliases, paginationToken) {
        return {
            type: GET_MORE_TAGGED_SUCCEEDED,
            alias, aliases, paginationToken
        }
    }

    function getMoreTaggedFailed(alias, error) {
        return {
            type: GET_MORE_TAGGED_FAILED,
            alias, error
        }
    }
