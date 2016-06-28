import {TAGGED_UNSELECTED} from './actionTypes'

export function unselectTagged(alias, tagged) {
    return {
        type: TAGGED_UNSELECTED,
        alias, tagged
    }
}