import {Router} from 'express';
import {raw} from 'body-parser';

const router = Router();
const rawBodyParser = raw({limit:'1GB', type:()=>true});

router.route("/entries/")
    .get(require('./entries/search'));

router.route("/entries/:alias")
    .get(require('./entries/get'))
    .patch(require('./entries/modify'))
    .delete(require('./entries/remove'));

router.route("/entries/:alias/tags")
    .get(require('./entries/get-tags'));

router.route("/tags/:alias")
    .get(require('./tags/get'))
    .patch(require('./entries/modify'))
    .delete(require('./entries/remove'));

router.route("/tags/:alias/entries")
    .get(require('./tags/get-entries'));

router.route("/tags/:alias/tags")
    .get(require('./entries/get-tags'));

router.route("/blobs/")
    .get(require('./blobs/search'));

router.route("/blobs/:alias")
    .get(require('./blobs/get'))
    .post(rawBodyParser, require('./blobs/create'))
    .patch(require('./entries/modify'))
    .delete(require('./entries/remove'));

router.route("/blobs/:alias/content")
    .get(require('./blobs/get-content'));

router.route("/blobs/:alias/tags")
    .get(require('./entries/get-tags'));

module.exports = router;
