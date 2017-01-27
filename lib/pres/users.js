'use strict';

const Boom = require('boom');

const verifyUniqueUser = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { username } = request.payload;
    
    Knex('users')
        .where('username', username)
        .whereNotNull('created_at')
        .then((data) => {

            if (data.length > 0) {
                reply(Boom.badRequest('user already exists'));
            }
            
            reply(request.payload);

        }).catch((err) => {

            reply(Boom.badRequest(err));
        });
};

module.exports = { verifyUniqueUser };