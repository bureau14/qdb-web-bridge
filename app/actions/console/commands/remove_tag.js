import {removeTag} from '../../quasardb'

export default {
    minArgs: 2,
    maxArgs: 2,
    args: 'alias tag',
    help: 'detach the specified tag from the specified entry',

    exec([alias,tag], {dispatch,onSucceeded,onFailed}) {
        dispatch(removeTag(alias, tag))
            .then(removed => onSucceeded(removed ? "Tag removed" : "Tag not set"))
            .catch(onFailed)
    }
}
