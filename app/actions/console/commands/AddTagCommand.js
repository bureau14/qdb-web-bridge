import {addTag} from '../../quasardb'

export default class AddTagCommand {
    minArgs = 2;
    maxArgs = 2;
    args = 'alias tag'

    exec([alias,tag], {dispatch,onSucceeded,onFailed}) {
        dispatch(addTag(alias, tag))
            .then(added => onSucceeded(added ? "Tag added" : "Tag already set"))
            .catch(onFailed)
    }
}
