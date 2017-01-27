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
        baseUrl: process.env.API_ROOT,
        rejectUnauthorized: true
    };
    
    Wreck.request('GET', `/customers?id=${request.query.id}`, options, (err, res) => {

        if (err) {
            reply(Boom.badRequest(err));
        } 

        reply(res);
    });
};

internals.handlerName = 'entry';

module.exports = internals;