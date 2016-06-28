import {addTag} from '../quasardb'
import asyncForEach from '../../helpers/asyncForEach';
import toastr from 'toastr'

export function addTags(entries, tags) {
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
            dispatch(addTag(entry, tag))
                .then(added => {
                    if (added)
                        toastr.info("Tag added!")
                    else
                        toastr.warning("Tag already set")
                })
                .catch(error => toastr.error(error))
        );
    }
}
