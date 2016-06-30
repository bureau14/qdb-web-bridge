import {sendQdbError} from '../../../../Quasardb'
import {detectMimeType} from '../../../../helpers/mime'

// GET /api/v1/blobs/:alias/content
export function get(req, res) {
    const {db} = req.app.locals;
    const {alias} = req.params;
    const {download} = req.query;

    db.blob(alias).get(function(err, content) {
        if (err) return sendQdbError(err, res);

        if (download) res.attachment(alias)

        detectMimeType(content, mime => {
            res.status(200).type(mime).send(content);
        });
    });
}