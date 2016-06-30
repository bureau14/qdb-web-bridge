import {remove} from '../../quasardb'

export default {
    minArgs: 1,
    maxArgs: 1,
    args: 'alias',
    help: 'remove (ie delete) an entry from the database',

    exec([alias], {dispatch,onSucceeded,onFailed}) {
        dispatch(remove(alias))
            .then(() => onSucceeded("Entry removed"))
            .catch(onFailed)
    }
}
