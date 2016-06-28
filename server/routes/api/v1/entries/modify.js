import {sendQdbError} from '../../../../Quasardb'

module.exports = function(req, res) {
    var db = req.app.locals.db;
    var alias = req.params.alias;
    var action = req.query.action;
    var tag = req.query.tag;

    if (!action)
        return res.status(400).send("action required");

    switch (action)
    {
    case "addTag":
        if (!tag)
            return res.status(400).send("tag required");

        db.blob(alias)
            .addTag(tag, function(err) {
                if (err) return sendQdbError(err, res);

                res.status(201).send('Tag "' + tag + '" added to "'+ alias +'"');
            });
        break;

    case "removeTag":
        if (!tag)
            return res.status(400).send("tag required");

        db.blob(alias)
            .removeTag(tag, function(err) {
                if (err) return sendQdbError(err, res);

                res.status(201).send('Tag "' + tag + '" removed from "'+ alias +'"');
            });
        break;

    default:
        return res.status(400).send("Unknown action "+action);
    }
}