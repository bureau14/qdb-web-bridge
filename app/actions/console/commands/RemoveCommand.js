import {remove} from '../../quasardb'

export default class RemoveCommand {
    minArgs = 1;
    maxArgs = 1;
    args = 'alias'

    exec([alias], {dispatch,onSucceeded,onFailed}) {
        dispatch(remove(alias))
            .then(() => onSucceeded("Entry removed"))
            .catch(onFailed)
    }
}
