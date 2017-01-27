'use strict';

const Boom = require('boom');
const internals = module.exports = {};

internals.verifyCustomer = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
  
    const { name } = request.payload;
    
    Knex('customers')
        .where('name', name)
        .whereNotNull('created_at')
        .then((data) => {

            if (data.length > 0) {
                reply(Boom.badRequest('customer already exists'));
            }

            reply(request.payload);

        }).catch((err) => {

            reply(Boom.badRequest(err));
        });
};
