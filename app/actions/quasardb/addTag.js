import qdb from '../../api/QuasardbApi.js';
import {TAG_ADDED} from './actionTypes'

export function addTag(entry, tag) {
    return dispatch =>
        qdb.addTag(entry, tag)
            .then(added => {
                if (added) dispatch(tagAdded(entry, tag))
                return added
            })
}

function tagAdded(alias, tag) {
    return {
        type: TAG_ADDED,
        alias, tag
    }
}