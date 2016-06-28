import {removeTag} from '../../quasardb'

export default class RemoveTagCommand {
    minArgs = 2;
    maxArgs = 2;
    args = 'alias tag'

    exec([alias,tag], {dispatch,onSucceeded,onFailed}) {
        dispatch(removeTag(alias, tag))
            .then(removed => onSucceeded(removed ? "Tag removed" : "Tag not set"))
            .catch(onFailed)
    }
}
