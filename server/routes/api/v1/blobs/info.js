import {sendQdbError} from '../../../../Quasardb'
import {detectMimeType} from '../../../../helpers/mime'

// GET /api/v1/blobs/:alias
export function info(req, res) {
    const db = req.app.locals.db;
    const alias = req.params.alias;
    const url = req.baseUrl + req.path;
    const blob = db.blob(alias);

    blob.get((err, content) => {
        if (err) return sendQdbError(err, res);

        const type = 'blob';
        const size = content.length;

        blob.getExpiry((err, expiry) => {
            detectMimeType(content, mime => {
                res.status(200).send({
                    alias, type, size, mime,
                    expiry: expiry.getTime() / 1000,
                    links: {
                        self: url,
                        content: url + "/content",
                        tags: url + "/tags"
                    }
                })
            })
        })
    });
}