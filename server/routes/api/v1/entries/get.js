module.exports = function(req, res) {
    var db = req.app.locals.db;
    var alias = req.params.alias;

    db.blob(alias).get(
        function(err) {
            if (!err)
                return res.redirect('/api/v1/blobs/' + encodeURIComponent(alias));

            if (err.code == 8) // not found
                return res.status(404).send(err.message);

            if (err.code != 34) // incompatible
                return res.status(500).send(err.message);

            db.tag(alias).getEntries(function(err) {
                if (!err)
                    return res.redirect('/api/v1/tags/' + encodeURIComponent(alias));

                res.status(500).send(err.message);
            });
        });
}