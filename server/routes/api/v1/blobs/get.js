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
            res.status(200)
                .set({
                    'Content-Type': mime,
                    'Content-Length': content.length,
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                })
                .send(content);
        });
    });
}