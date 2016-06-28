import qdb from '../../api/QuasardbApi.js';
import {TAG_REMOVED} from './actionTypes'

export function removeTag(entry, tag) {
    return dispatch => {
        return qdb.removeTag(entry, tag)
            .then(removed => {
                if (removed) dispatch(tagRemoved(entry, tag));
                return removed;
            })
    }
}

function tagRemoved(alias, tag) {
    return {
        type: TAG_REMOVED,
        alias, tag
    }
}
