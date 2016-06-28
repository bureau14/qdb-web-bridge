import {TAG_UNSELECTED} from './actionTypes'

export function unselectTag(alias, tag) {
    return {
        type: TAG_UNSELECTED,
        alias, tag
    }
}