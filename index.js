'use strict';

const Glue = require('glue');
const manifest = require('./manifest');

const options = {
    relativeTo: process.cwd()
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        console.log(`server started`);
    });
})