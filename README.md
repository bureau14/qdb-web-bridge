# REST API and GUI for quasardb

## Install requirements

First, you need to install `nodejs` 4.x and download quasardb C and Node APIs (`qdb_api.dll` and `qdb.node`)

    npm install -g gulp
    cp qdb.node node_modules/
    cp qdb_api.dll .

## Install and run

	npm install --production
	npm start --production

## Develop

    npm install
    gulp start
