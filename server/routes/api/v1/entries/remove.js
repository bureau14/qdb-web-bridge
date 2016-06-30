import {sendQdbError} from '../../../../Quasardb'

// DELETE /api/v1/entries/:alias
// DELETE /api/v1/blobs/:alias
// DELETE /api/v1/tags/:alias
export function remove(req, res) {
    var db = req.app.locals.db;
    var alias = req.params.alias;

    db.blob(alias).remove(
        function(err) {
            if (err) return sendQdbError(err, res);

            res.status(204).send('Entry "' + alias + '" removed');
        });
}