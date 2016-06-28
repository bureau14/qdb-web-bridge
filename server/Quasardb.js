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
    case qdb.E_ALIAS_NOT_FOUND:
        res.status(404).send(err.message);
        break;

    case qdb.E_TAG_ALREADY_SET:
    case qdb.E_TAG_NOT_SET:
        res.status(304).send(err.message);
        break;

    default:
        res.status(500).send(err.message);
        break;
    }
}

