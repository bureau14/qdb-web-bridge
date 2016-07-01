import qdb from '../../api/QuasardbApi.js';
import {EXPIRY_CHANGED} from './actionTypes'

export function setExpiry(alias, expiry) {
    return dispatch =>
        qdb.setExpiry(alias, expiry)
            .then(() => dispatch(expiryChanged(alias, expiry)))
}

function expiryChanged(alias, expiry) {
    return {
        type: EXPIRY_CHANGED,
        alias, expiry
    }
}