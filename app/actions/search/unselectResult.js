import {RESULT_UNSELECTED} from './actionTypes'

export function unselectResult(alias) {
    return {
        type: RESULT_UNSELECTED,
        alias
    }
}