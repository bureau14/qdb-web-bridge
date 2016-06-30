import {sendQdbError} from '../../../../Quasardb'
import {detectMimeType} from '../../../../helpers/mime'

// GET /api/v1/blobs/:alias
export function info(req, res) {
    const db = req.app.locals.db;
    const alias = req.params.alias;
    const url = req.baseUrl + req.path;

    db.blob(alias).get((err, data) => {
        if (err) return sendQdbError(err, res);

        const type = 'blob';
        const size = data.length;

        detectMimeType(data, mime => {
            res.status(200).send({
                alias, type, size, mime,
                links: {
                    self: url,
                    content: url + "/content",
                    tags: url + "/tags"
                }
            });
        })
    });
}