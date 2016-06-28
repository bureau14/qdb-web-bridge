import {TAGGED_SELECTED} from './actionTypes'

export function selectTagged(alias, tagged) {
    return {
        type: TAGGED_SELECTED,
        alias, tagged
    }
}