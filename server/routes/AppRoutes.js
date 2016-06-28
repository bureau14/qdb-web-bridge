import Express from 'express'

export default function AppRoutes(db, appFolder) {
	var appRouter = Express.Router();

	appRouter.route("/").get(function(req, res) {
		if (db.isConnected())
			res.render('index.ejs');
		else if (db.error())
			res.status("500")
				.render('notconnected.ejs', {
					uri: db.uri(),
					error: db.error().message
				});
		else res.status(500).render('starting.ejs');
	});

	appRouter.use(Express.static(appFolder));

	return appRouter;
}
