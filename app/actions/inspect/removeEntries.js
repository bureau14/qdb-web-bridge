import {remove} from '../quasardb'
import asyncForEach from '../../helpers/asyncForEach';
import toastr from 'toastr'

export function removeEntries(entries) {
    if (!(entries instanceof Array)) entries = [entries];

    return dispatch => {
        return asyncForEach(entries, entry =>
            dispatch(remove(entry))
                .then(() =>  toastr.info("Entry removed!"))
                .catch(error => toastr.error(error))
        );
    }
}