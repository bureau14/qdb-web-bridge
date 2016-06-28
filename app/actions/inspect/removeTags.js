import {removeTag} from '../quasardb'
import asyncForEach from '../../helpers/asyncForEach';
import toastr from 'toastr'

export function removeTags(entries, tags) {
    if (!(entries instanceof Array)) entries = [entries];
    if (!(tags instanceof Array)) tags = [tags];

    let operations = []
    for (let entry of entries) {
        for (let tag of tags) {
            operations.push({entry, tag});
        }
    }

    return dispatch => {
        return asyncForEach(operations, ({entry, tag}) =>
            dispatch(removeTag(entry, tag))
                .then(removed => {
                    if (removed)
                        toastr.info("Tag removed!")
                    else
                        toastr.warning("Tag not set")
                })
                .catch(error => toastr.error(error))
        );
    }
}
