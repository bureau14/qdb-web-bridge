import {RESULT_SELECTED} from './actionTypes'

export function selectResult(alias) {
    return {
        type: RESULT_SELECTED,
        alias
    }
}