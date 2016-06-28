import {Magic,MAGIC_MIME_TYPE} from 'mmmagic'

const magic = new Magic(MAGIC_MIME_TYPE);

export function detectMimeType(buffer, callback) {
    magic.detect(buffer, (err, result) => {
        callback(err ? 'application/octet-stream' : result);
    })
}