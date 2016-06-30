import {addTag} from '../../quasardb'

export default {
    minArgs: 2,
    maxArgs: 2,
    args: 'alias tag',
    help: 'attach the specified tag to the specified entry',

    exec([alias,tag], {dispatch,onSucceeded,onFailed}) {
        dispatch(addTag(alias, tag))
            .then(added => onSucceeded(added ? "Tag added" : "Tag already set"))
            .catch(onFailed)
    }
}