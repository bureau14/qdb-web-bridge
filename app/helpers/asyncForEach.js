export default function asyncForEach(collection, callback) {
    if (collection.length > 0) {
        const next = collection.shift();
        return callback(next).then(() => asyncForEach(collection, callback));
    } else {
        return Promise.resolve();
    }
}