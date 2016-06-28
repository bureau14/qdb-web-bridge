import Express from 'express';
import compression from 'compression';
import {QuasardbWrapper} from './Quasardb';
import AppRoutes from './routes/AppRoutes.js';



var PORT = process.env.PORT || 80;
console.log("PORT = " + PORT);

var APP_FOLDER = process.env.APP_FOLDER || __dirname + '../app';
console.log("APP_FOLDER = " + APP_FOLDER);

var CLUSTER_URI = process.env.CLUSTER_URI || 'qdb://127.0.0.1:2836';
console.log("CLUSTER_URI = " + CLUSTER_URI);


var qdb = new QuasardbWrapper(CLUSTER_URI);

var app = new Express();
app.set('views', __dirname + '/pages');
app.use(compression());

app.use('/', AppRoutes(qdb, APP_FOLDER));

app.locals.db = qdb.db();
app.use('/api/v1', require('./routes/api/v1/routes'));

app.listen(PORT);
