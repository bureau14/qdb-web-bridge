import qdb from '../../../api/QuasardbApi'

export default {
    minArgs: 1,
    maxArgs: 1,
    args: 'alias',
    help: 'get the list of tags that are attached to the specified entry',

    exec([alias], {onSucceeded,onFailed}) {
        qdb.getTags(alias)
            .then(res => {
                if (res.aliases.length == 0) {
                    onSucceeded(`Entry ${alias} doesn't have any tag`);
                } else {
                    let s = res.aliases.join();
                    if (res.links.next) s += '...'
                    onSucceeded(s);
                }
            })
            .catch(onFailed)
    }
}
