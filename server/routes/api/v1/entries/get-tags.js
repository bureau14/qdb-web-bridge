import url from 'url';

module.exports = function (req, res) {
    let db = req.app.locals.db;
    let alias = req.params.alias;
    let limit = parseInt(req.query.limit) || 100;
    let skip = parseInt(req.query.skip) || 0;

    db.blob(alias).getTags(
        function(err, tags) {
            if (err) {
                return res.status(500).send(err.message);
            }

            let response = {
                aliases: tags.slice(skip, skip+limit),
                links: {}
            };

            if (tags.length > skip+limit) {
                response.links.next =  url.format({
                    pathname: req.baseUrl + req.path,
                    query: {
                        skip: skip+limit,
                        limit
                    }
                });
            }

            res.status(200).send(response);
        });
}