import {sendQdbError} from '../../../../Quasardb'

module.exports = function(req, res) {
    const db = req.app.locals.db;
    const alias = req.params.alias;

    db.blob(alias).put(req.body, function(err) {
        if (err) return sendQdbError(err, res);

        res.status(201).send(`Blob "${alias}" created`);
    });
}