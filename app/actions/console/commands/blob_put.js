import {pickLocalFile} from '../../../helpers'
import qdb from '../../../api/QuasardbApi'
import bytes from 'bytes'

export default {
    minArgs: 1,
    maxArgs: 2,
    args: 'alias [content]',
    help: 'create and set the content of the specified blob, failing if it already exists',

    exec([alias,content], {onSucceeded,onFailed,onProgess,onCancelled}) {
        if (content != undefined) {
            return qdb.blobPut(alias, content, onProgess)
                .then(() => onSucceeded(`${bytes(content.length)} uploaded to blob ${alias}`))
                .catch(onFailed)
        }
        else {
            return pickLocalFile(file => {
                if (file) {
                  return qdb.blobPut(alias, file, onProgess)
                    .then(() => onSucceeded(`${bytes(file.size)} uploaded to blob ${alias}`))
                    .catch(onFailed)
                } else {
                    onCancelled();
                }
            });
        }
    }
}
