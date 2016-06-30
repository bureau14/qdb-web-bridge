import {pickLocalFile} from '../../../helpers'
import qdb from '../../../api/QuasardbApi'
import bytes from 'bytes'

export default {
    minArgs: 1,
    maxArgs: 2,
    args: 'alias [content]',
    help: 'set the content of specified blob, creating it if needed',

    exec([alias,content], {onSucceeded,onFailed,onProgess,onCancelled}) {
        if (content != undefined) {
            return qdb.blobUpdate(alias, content, onProgess)
                .then(() => onSucceeded(`${bytes(content.length)} uploaded to blob ${alias}`))
                .catch(onFailed)
        }
        else {
            return pickLocalFile(file => {
                if (file) {
                  return qdb.blobUpdate(alias, file, onProgess)
                    .then(() => onSucceeded(`${bytes(file.size)} uploaded to blob ${alias}`))
                    .catch(onFailed)
                } else {
                    onCancelled();
                }
            });
        }
    }
}
