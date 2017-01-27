'use strict';
const Boom = require('boom');
const Wreck = require('wreck');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};

internals.fetchById = (request, reply) => {

    const options = {
        baseUrl: process.env.apiRoot,
        rejectUnauthorized: true
    };

    const id = request.query.id;

    Wreck.request('GET', `/customers?uuid=${id}`, options, (err, res) => {

        if (err) {
            reply(Boom.badRequest(err));
        } 

        reply(res);
    });
};

internals.handlerName = 'entry';

module.exports = internals;