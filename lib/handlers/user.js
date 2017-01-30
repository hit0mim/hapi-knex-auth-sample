'use strict';
const Boom = require('boom');
const uuid = require('uuid');
const Bcrypt = require('bcrypt');
const Wreck = require('wreck');

const internals = (route, options) => {

    return (request, reply) => {
        internals[options.action](request, reply);
    };
};


internals.create = (request, reply) => {
    
    const Knex = request.server.plugins['hapi-knex'].Knex;
    const { email, password } = request.payload;
    const id = uuid.v4();
        
    Bcrypt.genSalt(10)
        .then((salt) => {
        Bcrypt.hash(password, salt)
            .then((hashPass) => {
            
            Knex('users').insert({ 
                email,
                password: hashPass,
                })
                .then((data) => {
                    reply({
                        data: data,
                        message: `successfully created a new user ${email}`,
                    }).code(201);
                }).catch((err) => {

                    reply(Boom.badRequest(err));
                });
            });
    });
};


internals.authenticate = (request, reply) => {

    const user = request.pre.user[0];
    const options = {
        headers: { 'content-type': 'application/json' },
        payload: {
            client_id: process.env.AUTH_CLIENT_ID,
            client_secret: process.env.AUTH_CLIENT_SECRET,
            audience: process.env.AUTH_AUDIENCE,
            grant_type: 'client_credentials'
        }
    };
        
    Wreck.request('POST', process.env.AUTH_URL, options, (err, res) => {

        if (err) {
            reply(Boom.badRequest(err));
        } 
        reply(res).code(201);
    });
};

internals.handlerName = 'user';

module.exports = internals;