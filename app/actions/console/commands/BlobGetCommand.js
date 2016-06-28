import {downloadFile} from '../../../helpers'
import qdb from '../../../api/QuasardbApi'
import bytes from 'bytes'

export default class BlobGetCommand {
    minArgs = 1;
    maxArgs = 1;
    args = 'alias'

    exec([alias], {onSucceeded,onFailed}) {
        qdb.getEntry(alias)
            .then(entry => {
                if (entry.type != 'blob') {
                    onFailed(`${alias} is a ${entry.type}, not a blob.`);
                }
                else if (entry.mime && entry.mime.startsWith('text/') && entry.size < 1024) {
                    qdb.blobGet(alias)
                        .then(data => onSucceeded(data))
                        .catch(onFailed)
                } else {
                    downloadFile(entry.links.content + "?download=true");
                    onSucceeded(`${bytes(entry.size)} downloaded`);
                }
            })
            .catch(onFailed)
    }
}
