import {GET_MORE_TAGS_STARTED,GET_MORE_TAGS_SUCCEEDED,GET_MORE_TAGS_FAILED} from './actionTypes'

export function getMoreTags(alias, paginationToken) {
    return dispatch => {
        dispatch(getMoreTagsStarted(alias, ));
        return paginationToken()
            .then(
                response => dispatch(getMoreTagsSucceeded(alias, response.aliases, response.funcs.next)),
                error => dispatch(getMoreTagsFailed(alias, error))
            );
    }
}

    function getMoreTagsStarted(alias) {
        return {
            type: GET_MORE_TAGS_STARTED,
            alias
        }
    }

    function getMoreTagsSucceeded(alias, aliases, paginationToken) {
        return {
            type: GET_MORE_TAGS_SUCCEEDED,
            alias, aliases, paginationToken
        }
    }

    function getMoreTagsFailed(alias, error) {
        return {
            type: GET_MORE_TAGS_FAILED,
            alias, error
        }
    }
