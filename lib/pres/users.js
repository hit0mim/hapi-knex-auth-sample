'use strict';

const Boom = require('boom');
const Bcrypt = require('bcrypt');

const verifyUniqueUser = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { email } = request.payload;
    
    Knex('users')
        .where('email', email)
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

const verifyUser = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { created_by } = request.payload;
    
    Knex('users')
        .where('email', created_by)
        .then((data) => {

            if (!data || data.length === 0) {
                reply(Boom.badRequest('user referred in created_by does not exist'));
            }
            
            reply(request.payload);

        }).catch((err) => {

            reply(Boom.badRequest(err));
        });
};

const verifyCredential = (request, reply) => {

    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { email, password } = request.payload;
    
    Knex('users')
        .where('email', email)
        .select('id', 'email', 'password')
        .then((data) => {

            if (!data || data.length === 0) {

                reply(Boom.badRequest('no email match was found'));
            }

            Bcrypt.compare(password, data[0].password)
                .then((result) => {
                    // result to be true
                    reply(data);

                }).catch((err) => {
                    // result to be false
                    reply(Boom.badRequest('password not matching', err))
                });
        });
};

module.exports = { verifyUniqueUser, verifyCredential, verifyUser };