import {Router} from 'express'
import {raw} from 'body-parser'
import * as entry from './entries'
import * as tag from './tags'
import * as blob from './blobs'

const router = Router();
const rawBodyParser = raw({limit:'1GB', type:()=>true});

router.route("/entries/")
    .get(entry.search);

    router.route("/entries/:alias")
        .get(entry.info)
        .patch(entry.patch)
        .delete(entry.remove);

        router.route("/entries/:alias/tags")
            .get(entry.tags);

router.route("/tags/:alias")
    .get(tag.info)
    .patch(entry.patch)
    .delete(entry.remove);

    router.route("/tags/:alias/entries")
        .get(tag.tagged);

    router.route("/tags/:alias/tags")
        .get(entry.tags);

router.route("/blobs/")
    .get(blob.search);

    router.route("/blobs/:alias")
        .get(blob.info)
        .post(rawBodyParser, blob.put)
        .put(rawBodyParser, blob.update)
        .patch(entry.patch)
        .delete(entry.remove);

        router.route("/blobs/:alias/content")
            .get(blob.get)
            .put(rawBodyParser, blob.update)
            .post(rawBodyParser, blob.put);

        router.route("/blobs/:alias/tags")
            .get(entry.tags);

module.exports = router;
