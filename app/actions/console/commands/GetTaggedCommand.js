import qdb from '../../../api/QuasardbApi'

export default class GetTaggedCommand {
    minArgs = 1;
    maxArgs = 1;
    args = 'alias'

    exec([alias], {onSucceeded,onFailed}) {
        qdb.getTagged(alias)
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
