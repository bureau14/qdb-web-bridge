module.exports = function (req, res) {
    var db = req.app.locals.db;
    var alias = req.params.alias;

    db.blob(alias).remove(
        function(err) {
            if (err)
                res.status(500).send(err.message);
            else
                res.status(204).send('Entry "' + alias + '" removed');
        });
}