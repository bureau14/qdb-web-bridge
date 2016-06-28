import url from 'url';

module.exports = function(req, res) {
    let db = req.app.locals.db;
    let pattern = req.query.pattern;
    let limit = parseInt(req.query.limit) || 50;
    let skip = parseInt(req.query.skip) || 0;
    let extra = 1;

    if (!pattern)
        return res.status(400).send("Pattern is required");

    db.range().blobScan(pattern, skip+limit+extra, function(err, aliases=[]) {
        if (err && err.code != 8) return res.status(500).send(err.message);

        let response = {
            aliases: aliases.slice(skip, skip+limit),
            links: {
                self: url.format({
                    pathname: req.baseUrl + req.path,
                    query: { pattern, skip, limit }
                }),
                next: url.format({
                    pathname: req.baseUrl + req.path,
                    query: {
                        pattern, limit,
                        skip: skip+limit
                    }
                })
            }
        }

        if (aliases.length <= skip+limit) {
            delete response.links.next;
        }

        res.status(200).send(response);
    });
}