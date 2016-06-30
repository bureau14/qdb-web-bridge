import {sendQdbError} from '../../../../Quasardb'
import url from 'url';

// GET /api/v1/tags/:alias/entries
export function tagged(req,res) {
    let db = req.app.locals.db;
    let alias = req.params.alias;
    let limit = parseInt(req.query.limit) || 50;
    let skip = parseInt(req.query.skip) || 0;

    db.tag(alias).getEntries(function(err, aliases) {
        if (err) return sendQdbError(err, res);

        let response = {
            aliases: aliases.slice(skip, skip+limit),
            links: {}
        };

        if (aliases.length > skip+limit) {
            response.links.next = url.format({
                pathname: req.baseUrl + req.path,
                query: {
                    skip: skip+limit,
                    limit: limit
                }
            });
        }

        return res.status(200).send(response);
    });
}