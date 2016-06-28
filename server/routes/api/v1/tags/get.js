module.exports = function(req,res) {
    res.status(200).send({
        alias: req.params.tag,
        type: 'tag',
        links: {
            self: req.baseUrl + req.path,
            entries: req.baseUrl + req.path + '/entries',
            tags: req.baseUrl + req.path + '/tags'
        }
    });
}