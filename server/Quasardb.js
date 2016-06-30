const qdb = require('qdb')

export class QuasardbWrapper {
    constructor(uri) {
        this._isConnected = false;
        this._cluster = new qdb.Cluster(uri);
        this._uri = uri;
        this.connect();
    }

    connect() {
        const that = this;
        console.log("Connecting to "+this._uri);
        this._cluster.connect(function() {
                that.error = undefined;
                console.log("Connected to quasardb!");
                that._isConnected = true;
            }, function(err) {
                that._error = err;
                console.log("Failed to connect! " + err.message);
                setTimeout(that.connect.bind(that), 10000);
            });
    }

    isConnected() {
        return this._isConnected;
    }

    db() {
        return this._cluster;
    }

    uri() {
        return this._uri;
    }

    error() {
        return this._error;
    }
}

export function sendQdbError(err, res) {
    switch (err.code) {
        case qdb.E_TAG_ALREADY_SET:
        case qdb.E_TAG_NOT_SET:
            return res.status(304).send(err.message);

        case qdb.E_ALIAS_NOT_FOUND:
            return res.status(404).send(err.message);

        case qdb.E_NOT_IMPLEMENTED:
            return res.status(501).send(err.message);

        case qdb.E_TIMEOUT:
            return res.status(504).send(err.message);
    }

    switch (err.origin) {
        case 0xc0000000: // input
            return res.status(400).send(err.message);

        case 0xb0000000: // operation
            return res.status(422).send(err.message);

        case 0xa0000000: // protocol
            return res.status(502).send(err.message);

        default:
            return res.status(500).send(err.message);
    }
}

