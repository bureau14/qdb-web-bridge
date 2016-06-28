import {TAG_SELECTED} from './actionTypes'

export function selectTag(alias, tag) {
    return {
        type: TAG_SELECTED,
        alias, tag
    }
}