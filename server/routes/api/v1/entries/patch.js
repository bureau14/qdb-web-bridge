import {sendQdbError} from '../../../../Quasardb'

function addTag(req, res) {
    const {db} = req.app.locals;
    const {alias} = req.params;
    const {tag} = req.query;

    if (!tag) {
        return res.status(400).send("tag required");
    }

    db.blob(alias)
        .addTag(tag, function(err) {
            if (err) return sendQdbError(err, res);

            res.status(204).send('Tag "' + tag + '" added to "'+ alias +'"');
        });
}

function removeTag(req, res) {
    const {db} = req.app.locals;
    const {alias} = req.params;
    const {tag} = req.query;

    if (!tag) {
        return res.status(400).send("tag required");
    }

    db.blob(alias)
        .removeTag(tag, function(err) {
            if (err) return sendQdbError(err, res);

            res.status(204).send('Tag "' + tag + '" removed from "'+ alias +'"');
        });
}

function setExpiry(req, res) {
    const {db} = req.app.locals;
    const {alias} = req.params;

    let {expiry} = req.query;
    if (!expiry) {
        return res.status(400).send("expiry required");
    }

    expiry = parseInt(expiry);
    if (isNaN(expiry)) {
        return res.status(400).send("expiry must be an integer");
    }

    const date = new Date(expiry*1000);
    db.blob(alias)
        .expiresAt(date, function(err) {
            if (err) return sendQdbError(err, res);

            res.status(204).send('Changed expiry of entry ' + alias);
        });
}


// PATCH /api/v1/entries/:alias
// PATCH /api/v1/blobs/:alias
// PATCH /api/v1/tags/:alias
export function patch(req, res) {
    const {action} = req.query;

    switch (action)
    {
    case undefined:
        return res.status(400).send("Query parameter 'action' is missing");

    case "addTag":
        return addTag(req, res);

    case "removeTag":
       return removeTag(req, res);

    case "setExpiry":
        return setExpiry(req, res);

    default:
        return res.status(422).send("Unknown action "+action);
    }
}