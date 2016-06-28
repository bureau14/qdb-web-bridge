import qdb from '../../api/QuasardbApi.js';
import {GET_TAGS_STARTED,GET_TAGS_SUCCEEDED,GET_TAGS_FAILED} from './actionTypes'

export function getTags(alias) {
    return dispatch => {
        dispatch(getTagsStarted(alias));
        return qdb
            .getTags(alias)
            .then(
                res => dispatch(getTagsSucceeded(alias, res.aliases, res.funcs.next)),
                error => dispatch(getTagsFailed(alias, error))
            )
    }
}

    function getTagsStarted(alias) {
        return {
            type: GET_TAGS_STARTED,
            alias
        }
    }

    function getTagsSucceeded(alias, aliases, paginationToken) {
        return {
            type: GET_TAGS_SUCCEEDED,
            alias, aliases, paginationToken
        }
    }

    function getTagsFailed(alias, error) {
        return {
            type: GET_TAGS_FAILED,
            alias, error
        }
    }

