import {sendQdbError} from '../../../../Quasardb'

// PUT /api/v1/blobs/:alias
// PUT /api/v1/blobs/:alias/content
export function update(req, res) {
    const db = req.app.locals.db;
    const alias = req.params.alias;

    db.blob(alias).update(req.body, function(err) {
        if (err) return sendQdbError(err, res);

        res.status(204).send(`Blob "${alias}" updated`);
    });
}